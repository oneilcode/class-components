import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFileUpload } from '../hooks/useFileUpload';
import { validateFile, convertToBase64 } from '../utils/fileValidation';

vi.mock('../utils/fileValidation', () => ({
  validateFile: vi.fn(),
  convertToBase64: vi.fn(),
}));

describe('useFileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useFileUpload());

    expect(result.current.imageBase64).toBe('');
    expect(result.current.fileError).toBe('');
  });

  it('should handle file selection with valid file', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockBase64 = 'base64string';

    vi.mocked(validateFile).mockReturnValue(null);
    vi.mocked(convertToBase64).mockResolvedValue(mockBase64);

    const { result } = renderHook(() => useFileUpload());

    const mockEvent = {
      target: { files: [mockFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleFileChange(mockEvent);
    });

    await waitFor(() => {
      expect(result.current.imageBase64).toBe(mockBase64);
      expect(result.current.fileError).toBe('');
    });
  });

  it('should handle file selection with invalid file', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const mockError = 'Only .jpg or .png files are allowed';

    vi.mocked(validateFile).mockReturnValue(mockError);

    const { result } = renderHook(() => useFileUpload());

    const mockEvent = {
      target: { files: [mockFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleFileChange(mockEvent);
    });

    expect(result.current.imageBase64).toBe('');
    expect(result.current.fileError).toBe(mockError);
  });

  it('should handle no file selected', async () => {
    const { result } = renderHook(() => useFileUpload());

    const mockEvent = {
      target: { files: [] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleFileChange(mockEvent);
    });

    expect(result.current.imageBase64).toBe('');
    expect(result.current.fileError).toBe('');
  });

  it('should reset file', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockBase64 = 'base64string';

    vi.mocked(validateFile).mockReturnValue(null);
    vi.mocked(convertToBase64).mockResolvedValue(mockBase64);

    const { result } = renderHook(() => useFileUpload());

    const mockEvent = {
      target: { files: [mockFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleFileChange(mockEvent);
    });

    await waitFor(() => {
      expect(result.current.imageBase64).toBe(mockBase64);
    });

    act(() => {
      result.current.resetFile();
    });

    expect(result.current.imageBase64).toBe('');
    expect(result.current.fileError).toBe('');
  });
});
