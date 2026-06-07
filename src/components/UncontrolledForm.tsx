import { useState } from 'react';
import { useUserStore, type IFormData } from '../store/use-users-store';
import { formSchema } from '../schemas/formSchema';
import { PasswordStrength } from './PasswordStrength';
import Autocomplete from './Autocomplete';
import { useFileUpload } from '../hooks/useFileUpload';
import { FIELD_LABELS } from '../constants/fieldLabels';

export interface IFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: IFormProps) {
  const { imageBase64, fileError, handleFileChange } = useFileUpload();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState('');
  const addUser = useUserStore((state) => state.addUser);

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
      country: formData.get('country') as string,
    };

    const result = formSchema.safeParse(data);

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
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-input">
        <label htmlFor="name">{FIELD_LABELS.name}</label>
        <input type="text" name="name" id="name" />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="age">{FIELD_LABELS.age}</label>
        <input type="number" name="age" id="age" />
        {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="email">{FIELD_LABELS.email}</label>
        <input type="text" name="email" id="email" />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div className="form-input">
        <Autocomplete
          value={selectedCountry}
          onChange={(country) => setSelectedCountry(country)}
        />
        <input type="hidden" name="country" value={selectedCountry} />
        {errors.country && (
          <span style={{ color: 'red' }}>{errors.country}</span>
        )}
      </div>

      <div className="form-input">
        <input type="radio" name="gender" id="man" value="man" />
        <label htmlFor="man">Man</label>
        <input type="radio" name="gender" id="woman" value="woman" />
        <label htmlFor="woman">Woman</label>
        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="password">{FIELD_LABELS.password}</label>
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
        <label htmlFor="confirmPassword">{FIELD_LABELS.confirmPassword}</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        {errors.confirmPassword && (
          <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-input">
        <label htmlFor="file">{FIELD_LABELS.file}</label>
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
        <label htmlFor="terms">{FIELD_LABELS.terms}</label>
        {errors.terms && <span style={{ color: 'red' }}>{errors.terms}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
