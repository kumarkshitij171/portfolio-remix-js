import { FC } from 'react';
  
  interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    setIsEditing: (editing: boolean) => void;
  }
  
  const Sidebar: FC<SidebarProps> = ({ activeSection, setActiveSection, setIsEditing }) => {
    const sections = [
      { id: 'personal', label: 'Personal Information' },
      { id: 'about', label: 'About' },
      { id: 'roles', label: 'Roles' },
      { id: 'experiences', label: 'Experiences' },
      { id: 'projects', label: 'Projects' },
      { id: 'skills', label: 'Skills' },
      { id: 'education', label: 'Education' },
      { id: 'contactInfo', label: 'Contact Information' },
    ];
  
    return (
      <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    setIsEditing(false); 
                    setActiveSection(section.id)
                  }}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeSection === section.id ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;