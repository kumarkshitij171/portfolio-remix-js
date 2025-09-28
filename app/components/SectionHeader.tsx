import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

interface SectionHeaderProps {
  title: string;
  activeSection: string;
  handleAdd: () => void;
  showAddButton: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  activeSection,
  handleAdd,
  showAddButton,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold capitalize">{title.replace(/([A-Z])/g, ' $1').trim()}</h2>

      {activeSection !== 'personal' && activeSection !== 'about' && showAddButton && (
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded"
        >
          <FiPlus size={16} /> Add
        </button>
      )}
    </div>
  );
};

export default SectionHeader;