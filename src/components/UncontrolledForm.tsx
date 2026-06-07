import { useState } from 'react';
import { useUserStore, type IFormData } from '../store/use-users-store';
import { formSchema } from '../schemas/formSchema';
import { convertToBase64, validateFile } from '../utils/fileValidation';
import { PasswordStrength } from './PasswordStrength';

export interface IFormProps {
  onSubmit: (data: IFormData) => void;
  onClose: () => void;
}

export default function UncontrolledForm({ onSubmit, onClose }: IFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageBase64, setImageBase64] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [password, setPassword] = useState('');
  const addUser = useUserStore((state) => state.addUser);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: IFormData = {
      id: 0,
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      gender: formData.get('gender') as string as 'man' | 'woman',
      terms: formData.get('terms') === 'on',
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const result = formSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (path && typeof path === 'string') {
          fieldErrors[path] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const dataWithId = { ...result.data, id: Date.now(), file: imageBase64 };
    addUser(dataWithId);
    onSubmit(dataWithId);
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" />
        {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div className="form-input">
        <input type="radio" name="gender" id="man" value="man" />
        <label htmlFor="man">Man</label>
        <input type="radio" name="gender" id="woman" value="woman" />
        <label htmlFor="woman">Woman</label>
        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password}</span>
        )}
        <PasswordStrength password={password} />
      </div>

      <div className="form-input">
        <label htmlFor="confirmPassword">Сonfirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        {errors.confirmPassword && (
          <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-input">
        <label htmlFor="file">Upload image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {fileError && <span style={{ color: 'red' }}>{fileError}</span>}
      </div>

      <div className="form-input">
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms">Accept terms and conditions</label>
        {errors.terms && <span style={{ color: 'red' }}>{errors.terms}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
