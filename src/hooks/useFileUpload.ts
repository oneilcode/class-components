import { useState } from 'react';
import { convertToBase64, validateFile } from '../utils/fileValidation';

export const useFileUpload = () => {
  const [imageBase64, setImageBase64] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageBase64('');
      setFileError('');
      return;
    }

    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setImageBase64('');
      return;
    }

    const base64 = await convertToBase64(file);
    setImageBase64(base64);
    setFileError('');
  };

  const resetFile = () => {
    setImageBase64('');
    setFileError('');
  };

  return {
    imageBase64,
    fileError,
    handleFileChange,
    resetFile,
  };
};
