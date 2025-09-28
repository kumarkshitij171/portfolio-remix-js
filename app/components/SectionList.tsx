/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
  import { FiEdit, FiTrash2, FiExternalLink, FiPlus } from 'react-icons/fi';
  
  interface SectionListProps {
    activeSection: string;
    portfolioData: any;
    handleEdit: (section: string, item?: any) => void;
    handleDelete: (section: string, id: number) => void;
  }
  
  const SectionList: FC<SectionListProps> = ({
    activeSection,
    portfolioData,
    handleEdit,
    handleDelete,
  }) => {
    const renderEmptyState = () => (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No items found. Add your first one!</p>
        <button
          onClick={() => handleEdit(activeSection)}
          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded mx-auto"
        >
          <FiPlus size={16} /> Add
        </button>
      </div>
    );
  
    const renderPersonalSection = () => {
      const personal = portfolioData.personal;
      if (!personal || Object.keys(personal).length === 0) return renderEmptyState();
  
      return (
        <div>
          <div className="flex mb-4">
            {personal.photoUrl && (
              <div className="mr-4">
                <img 
                  src={personal.photoUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border border-gray-200" 
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p>{personal.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Headline</h3>
                <p>{personal.headline}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Resume</h3>
                <a
                  href={personal.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 flex items-center gap-1"
                >
                  View Resume <FiExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleEdit('personal')}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded"
          >
            <FiEdit size={16} /> Edit
          </button>
        </div>
      );
    };
  
    const renderAboutSection = () => {
      const about = portfolioData.about;
      if (!about || Object.keys(about).length === 0) return renderEmptyState();
  
  
      return (
        <div>
          <div className="flex mb-4">
            <p className="whitespace-pre-line flex-1">{about.about}</p>
          </div>
          <button
            onClick={() => handleEdit('about')}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded"
          >
            <FiEdit size={16} /> Edit
          </button>
        </div>
      );
    };

    const renderRolesList = () => {
      if (!portfolioData.roles || portfolioData.roles.length === 0) return renderEmptyState();
  
      return (
        <div>
          <ul className="divide-y divide-gray-200">
            {portfolioData.roles.map((item: any) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  {item.photoUrl && (
                    <img 
                      src={item.photoUrl} 
                      alt={item.name} 
                      className="w-12 h-12 rounded object-cover mr-3"
                    />
                  )}
                  <span>{item.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activeSection, item)}
                    className="text-blue-500"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(activeSection, item.id)}
                    className="text-red-500"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleEdit(activeSection)}
            className="mt-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
          >
            <FiPlus size={16} /> Add
          </button>
        </div>
      );
    };
  
    const renderSkillsList = () => {
      if (!portfolioData.skills || portfolioData.skills.length === 0) return renderEmptyState();
  
      return (
        <div>
          <ul className="divide-y divide-gray-200">
            {portfolioData.skills.map((item: any) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  {item.photoUrl && (
                    <img 
                      src={item.photoUrl} 
                      alt={item.name} 
                      className="w-12 h-12 rounded object-cover mr-3"
                    />
                  )}
                  <div>
                    <span>{item.name}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activeSection, item)}
                    className="text-blue-500"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(activeSection, item.id)}
                    className="text-red-500"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleEdit(activeSection)}
            className="mt-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
          >
            <FiPlus size={16} /> Add
          </button>
        </div>
      );
    };
  
    const renderContactInfoList = () => {
      if (!portfolioData.contactInfo || portfolioData.contactInfo.length === 0) return renderEmptyState();
  
      return (
        <div>
          <ul className="divide-y divide-gray-200">
            {portfolioData.contactInfo.map((item: any) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  {item.photoUrl && (
                    <img 
                      src={item.photoUrl} 
                      alt={item.type} 
                      className="w-12 h-12 rounded object-cover mr-3"
                    />
                  )}
                  <div>
                    <span className="font-medium">{item.type}:</span> {item.value}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activeSection, item)}
                    className="text-blue-500"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(activeSection, item.id)}
                    className="text-red-500"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleEdit(activeSection)}
            className="mt-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
          >
            <FiPlus size={16} /> Add
          </button>
        </div>
      );
    };
  
    const renderExperiencesList = () => {
      if (!portfolioData.experiences || portfolioData.experiences.length === 0) return renderEmptyState();
  
      return (
        <div>
          <ul className="divide-y divide-gray-200">
            {portfolioData.experiences.map((item: any) => (
              <li key={item.id} className="py-4">
                <div className="flex justify-between">
                  <div className="flex">
                    {item.photoUrl && (
                      <img 
                        src={item.photoUrl} 
                        alt={`${item.company} logo`} 
                        className="w-16 h-16 rounded object-cover mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">{item.role} at {item.company}</h3>
                      <p className="text-sm text-gray-500">{item.period}</p>
                      <p className="mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(activeSection, item)}
                      className="text-blue-500"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(activeSection, item.id)}
                      className="text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleEdit(activeSection)}
            className="mt-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
          >
            <FiPlus size={16} /> Add
          </button>
        </div>
      );
    };
  
    const renderProjectsList = () => {
      if (!portfolioData.projects || portfolioData.projects.length === 0) return renderEmptyState();
  
      return (
        <div>
          <ul className="divide-y divide-gray-200">
            {portfolioData.projects.map((item: any) => (
              <li key={item.id} className="py-4">
                <div className="flex justify-between">
                  <div className="flex">
                    {item.photoUrl && (
                      <img 
                        src={item.photoUrl} 
                        alt={item.title} 
                        className="w-16 h-16 rounded object-cover mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="mt-1">{item.description}</p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 flex items-center gap-1 mt-1 text-sm"
                        >
                          View Project <FiExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(activeSection, item)}
                      className="text-blue-500"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(activeSection, item.id)}
                      className="text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleEdit(activeSection)}
            className="mt-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
          >
            <FiPlus size={16} /> Add
          </button>
        </div>
      );
    };
  
    const renderEducationList = () => {
      if (!portfolioData.education || portfolioData.education.length === 0) return renderEmptyState();
  
      return (
        <div>
          <ul className="divide-y divide-gray-200">
            {portfolioData.education.map((item: any) => (
              <li key={item.id} className="py-4">
                <div className="flex justify-between">
                  <div className="flex">
                    {item.photoUrl && (
                      <img 
                        src={item.photoUrl} 
                        alt={item.institution} 
                        className="w-16 h-16 rounded object-cover mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">{item.degree}</h3>
                      <p className="text-sm text-gray-500">{item.institution}, {item.period}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(activeSection, item)}
                      className="text-blue-500"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(activeSection, item.id)}
                      className="text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleEdit(activeSection)}
            className="mt-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
          >
            <FiPlus size={16} /> Add
          </button>
        </div>
      );
    };
  
    switch (activeSection) {
        case 'personal':
          return renderPersonalSection();
        case 'about':
          return renderAboutSection();
        case 'roles':
          return renderRolesList();
        case 'skills':
          return renderSkillsList();
        case 'contactInfo':
          return renderContactInfoList();
        case 'experiences':
          return renderExperiencesList();
        case 'projects':
          return renderProjectsList();
        case 'education':
          return renderEducationList();
        default:
          return null;
      }
    };

export default SectionList;