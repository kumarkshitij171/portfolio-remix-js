/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
  import { FiUpload } from 'react-icons/fi';
  
  interface PhotoUploadProps {
    currentPhoto?: string;
    onPhotoChange: (photo: File) => void;
  }
  
  const PhotoUpload: FC<PhotoUploadProps> = ({ currentPhoto, onPhotoChange }) => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentPhoto);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewUrl(result);
        };
        reader.readAsDataURL(file);
        onPhotoChange(file);
      }
    };
  
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
        <div className="flex items-end space-x-4">
          {previewUrl ? (
            <div className="relative w-24 h-24 overflow-hidden rounded-lg border border-gray-300">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg border border-gray-300">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          <label className="cursor-pointer flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <FiUpload className="mr-2" />
            {previewUrl ? 'Change Photo' : 'Upload Photo'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    );
  };
  
  export default PhotoUpload;