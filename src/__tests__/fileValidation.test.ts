import { describe, it, expect } from 'vitest';
import { convertToBase64, validateFile } from '../utils/fileValidation';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

describe('fileValidation', () => {
  describe('validateFile', () => {
    it('should return null for valid PNG file', () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      Object.defineProperty(mockFile, 'size', { value: 1024 });
      expect(validateFile(mockFile)).toBeNull();
    });

    it('should return null for valid JPEG file', () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(mockFile, 'size', { value: 1024 });
      expect(validateFile(mockFile)).toBeNull();
    });

    it('should return error for non-image file', () => {
      const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      expect(validateFile(mockFile)).toBe(
        'Only .jpg or .png files are allowed'
      );
    });

    it('should return error for file too large', () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      Object.defineProperty(mockFile, 'size', { value: MAX_FILE_SIZE + 1 });
      expect(validateFile(mockFile)).toBe('File size must be less than 5MB');
    });

    it('should return null for undefined file', () => {
      expect(validateFile(undefined)).toBeNull();
    });
  });

  describe('convertToBase64', () => {
    it('should convert file to base64 string', async () => {
      const mockFile = new File(['hello'], 'test.txt', { type: 'text/plain' });
      const base64 = await convertToBase64(mockFile);
      expect(base64).toContain('data:text/plain;base64');
    });
  });
});
