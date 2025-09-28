/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { json, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Sidebar from '../components/Sidebar';
import SectionHeader from '../components/SectionHeader';
import SectionList from '../components/SectionList';
import EditForm from '../components/EditForm';
import { PortfolioData } from '../types/portfolio';
import { requireAuth } from '~/middleware/auth';
import axios from 'axios';
import { loadData } from '~/utils/loadData.server';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface UpdatedData extends PortfolioData {
  [key: string]: any; 
}

export const loader = async ({ request }: { request: Request }) => {
  try {
    const user = await requireAuth(request);
    const data = await loadData();
    return json<{ data: PortfolioData; name: string }>({ data, name: user.name });
  } catch (error) {
    console.error("error in dashboard loader: ",error)
    return json({});
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Welcome to the admin dashboard" },
  ];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const portfolioData = useLoaderData<{ data: PortfolioData; name: string }>();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<any>>({});
  const [localData, setLocalData] = useState<PortfolioData | null>(null);
  const [currentUrl,setCurrentUrl] = useState<string>('');
  const [spinning, setSpinning] = useState(false);

  useEffect(()=>{
    setCurrentUrl(window.location.origin);
    if(!portfolioData?.data){
      navigate("/login");
    }
  },[])

  useEffect(() => {
    if (portfolioData && portfolioData.data) {
      setLocalData(portfolioData.data as PortfolioData);
      setLoading(false);
    }
  }, [portfolioData]);

  const handleEdit = (section: string, item: any = null) => {
    if (section === 'personal') {
      setEditData(localData?.personal || {});
    } else if (section === 'about') {
      setEditData(localData?.about || {});
    } else if (item) {
      setEditData({ ...item });
    } else {
      setEditData({});
    }
    setIsEditing(true);
  };

  const handlePhotoChange = (photo: File) => {
    setEditData(prev => ({ ...prev, photo }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (section: string, item: any = null) => {
    try {
      const formData = new FormData();

      for (const key in editData) {
        if (Object.hasOwnProperty.call(editData, key)) {
          formData.append(key, editData[key]);
        }
      }

      setSpinning(true);

      const res = await axios({
        method: item && item.id ? 'put' : 'post',
        url: `${currentUrl}/api/dashboard/${section}${item ? `?id=${item.id}` : ''}`,
        headers: { 
          'Content-Type': 'multipart/form-data' 
        },
        data: formData
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message);
        if (!localData) return;
        const updatedData:UpdatedData = { ...localData };

        if (section === 'personal') {
          updatedData.personal = res.data?.data as any || editData as any;
        } else if (section === 'about') {
          updatedData.about = res.data?.data as any || editData as any;
        } else if (item && item.id) {
          updatedData[section] = updatedData[section].map((i: any) =>
            i.id === item.id ? (res.data?.data || editData ): i
          );
        } else {
          const newId = res.data?.data?.id || Date.now();
          updatedData[section] = [...updatedData[section], { ...res?.data?.data || editData, id: newId }];
        }
        setLocalData(updatedData);
        setIsEditing(false);
        setEditData({});
      }
      else{
        toast.error(res?.data?.message);
        return;
      }
    } catch (error) {
      console.error(`Error saving ${section}:`, error);
      toast.error('Something went wrong');
    }
    finally{
      setSpinning(false);
    }
  };

  const handleDelete = async (section: string, id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const res =await axios.delete(`${currentUrl}/api/dashboard/${section}`, {
          params: {
            id: id,
          },
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if(res?.status!==200){
          toast.error(res?.data?.message);
          return;
        }
        
        toast.success(res?.data?.message)
        if (!localData) return;
        const updatedData: UpdatedData = { ...localData };
        updatedData[section] = updatedData[section].filter((item: any) => item.id !== id);
        setLocalData(updatedData);
      } catch (error) {
        console.error(`Error deleting ${section} item:`, error);
        toast.error("something went wrong");
      }
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'contactInfo':
        return 'Contact Information';
      default:
        return activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    }
  };

  if (loading || !localData) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard data...</div>;
  }

  const handleSignOut = async() => {
    try {
      await axios.get(`${currentUrl}/signout`);
      toast.success("signed out successfully");
      navigate('/login');
    } catch (error) {
      console.error("error in signout: ",error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster/>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{portfolioData.name} - Portfolio Dashboard</h1>
        </div>
        <button 
          onClick={handleSignOut} 
          className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded'
          >Sign out</button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} setIsEditing={setIsEditing} />

          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <SectionHeader
              title={getSectionTitle()}
              activeSection={activeSection}
              handleAdd={() => handleEdit(activeSection)}
              showAddButton={!isEditing}
            />

            <div>
              {isEditing ? (
                <EditForm
                  activeSection={activeSection}
                  editData={editData}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  spinning={spinning}
                  cancelEdit={() => {
                    setIsEditing(false);
                    setEditData({});
                  }}
                  handlePhotoChange={handlePhotoChange}
                />
              ) : (
                <SectionList
                  activeSection={activeSection}
                  portfolioData={localData}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}