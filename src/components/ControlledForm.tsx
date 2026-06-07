import type { IFormProps } from './UncontrolledForm';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore, type IFormData } from '../store/use-users-store';
import { formSchema } from '../schemas/formSchema';
import { PasswordStrength } from './PasswordStrength';
import Autocomplete from './Autocomplete';
import { useFileUpload } from '../hooks/useFileUpload';
import { FIELD_LABELS } from '../constants/fieldLabels';

export default function ControlledForm({ onClose }: IFormProps) {
  const { imageBase64, fileError, handleFileChange } = useFileUpload();
  const addUser = useUserStore((state) => state.addUser);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: undefined,
      terms: false,
      password: '',
      confirmPassword: '',
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch('password');

  const onSubmitHandler = (data: Omit<IFormData, 'id' | 'file'>) => {
    const formDataWithImage = {
      ...data,
      id: Date.now(),
      file: imageBase64,
    };

    addUser(formDataWithImage);
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-input">
        <label htmlFor="name">{FIELD_LABELS.name}</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span style={{ color: 'red' }}>{errors.name.message}</span>
        )}
      </div>

      <div className="form-input">
        <label htmlFor="age">{FIELD_LABELS.age}</label>
        <input
          type="number"
          id="age"
          {...register('age', { required: true })}
        />
        {errors.age && (
          <span style={{ color: 'red' }}>{errors.age.message}</span>
        )}
      </div>

      <div className="form-input">
        <label htmlFor="email">{FIELD_LABELS.email}</label>
        <input
          type="text"
          id="email"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <span style={{ color: 'red' }}>{errors.email.message}</span>
        )}
      </div>

      <div className="form-input">
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Autocomplete value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.country && (
          <span style={{ color: 'red' }}>{errors.country.message}</span>
        )}
      </div>

      <div className="form-input">
        <input type="radio" id="man" value="man" {...register('gender')} />
        <label htmlFor="man">Man</label>
        <input type="radio" id="woman" value="woman" {...register('gender')} />
        <label htmlFor="woman">Woman</label>
        {errors.gender && (
          <span style={{ color: 'red' }}>{errors.gender.message}</span>
        )}
      </div>

      <div className="form-input">
        <label htmlFor="password">{FIELD_LABELS.password}</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password.message}</span>
        )}
        <PasswordStrength password={password} />
      </div>

      <div className="form-input">
        <label htmlFor="confirmPassword">{FIELD_LABELS.confirmPassword}</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', { required: true })}
        />
        {errors.confirmPassword && (
          <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="form-input">
        <label htmlFor="file">{FIELD_LABELS.file}</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {fileError && <span style={{ color: 'red' }}>{fileError}</span>}
      </div>

      <div className="form-input">
        <input type="checkbox" id="terms" {...register('terms')} />
        <label htmlFor="terms">{FIELD_LABELS.terms}</label>
        {errors.terms && (
          <span style={{ color: 'red' }}>{errors.terms.message}</span>
        )}
      </div>

      <button type="submit" disabled={!isValid || !!fileError}>
        Submit
      </button>
    </form>
  );
}
