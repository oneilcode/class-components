export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const validateFile = (file: File | undefined): string | null => {
  if (!file) return null;

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'Only .jpg or .png files are allowed';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 5MB';
  }

  return null;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
