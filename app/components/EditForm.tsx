/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
  import { FiSave, FiX } from 'react-icons/fi';
  import PhotoUpload from './PhotoUpload';
import Spinner from './Spinner';
  
  interface EditFormProps {
    activeSection: string;
    editData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSave: (section: string, item: any) => void;
    cancelEdit: () => void;
    handlePhotoChange: (photo: File) => void;
    spinning: boolean
  }
  
  const EditForm: FC<EditFormProps> = ({
    activeSection,
    editData,
    handleChange,
    handleSave,
    cancelEdit,
    handlePhotoChange,
    spinning
  }) => {

    const renderFormFields = () => {
      switch (activeSection) {
        case 'personal':
          return (
            <>
              <PhotoUpload
                currentPhoto={editData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={editData.headline || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resume Link</label>
                <input
                  type="url"
                  name="resumeLink"
                  value={editData.resumeLink || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        case 'about':
          return (
            <div>
              <label className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                name="about"
                value={editData.about || ''}
                onChange={handleChange}
                rows={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div> 
          );
  
        case 'roles':
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role Title</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        case 'experiences':
          return (
            <>
              <PhotoUpload
                currentPhoto={editData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={editData.company || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editData.role || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Period</label>
                <input
                  type="text"
                  name="period"
                  value={editData.period || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        case 'projects':
          return (
            <>
              <PhotoUpload
                currentPhoto={editData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editData.title || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  name="link"
                  value={editData.link || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        case 'skills':
          return (
            <>
              <PhotoUpload
                currentPhoto={editData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        case 'education':
          return (
            <>
              <PhotoUpload
                currentPhoto={editData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={editData.institution || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={editData.degree || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Period</label>
                <input
                  type="text"
                  name="period"
                  value={editData.period || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        case 'contactInfo':
          return (
            <>
              <PhotoUpload
                currentPhoto={editData.photoUrl}
                onPhotoChange={handlePhotoChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editData.type || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <input
                  type="text"
                  name="value"
                  value={editData.value || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          );
  
        default:
          return null;
      }
    };
  
    return (
      <div className="space-y-4">
        {renderFormFields()}
        <div className="flex gap-2">
          <button
            onClick={() => handleSave(activeSection, editData.id ? editData : null)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            {
              spinning ? <Spinner /> : <div className='flex items-center gap-1'><FiSave size={16} /> Save</div>
            }
          </button>
          <button
            onClick={cancelEdit}
            className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded"
          >
            <FiX size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  };
  
  export default EditForm;