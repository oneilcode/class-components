import { Controller, useForm } from 'react-hook-form';
import type { IFormProps } from './UncontrolledForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore, type IFormData } from '../store/use-users-store';
import { formSchema } from '../schemas/formSchema';
import { PasswordStrength } from './PasswordStrength';
import Autocomplete from './Autocomplete';
import { useFileUpload } from '../hooks/useFileUpload';

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

  const onSubmitHandler = (data: IFormData) => {
    const formDataWithImage = {
      ...data,
      file: imageBase64,
    };

    addUser(formDataWithImage);
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-input">
        <label htmlFor="name">Name</label>
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
        <label htmlFor="age">Age</label>
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
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
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
        <label htmlFor="confirmPassword">Сonfirm password</label>
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
        <label htmlFor="file">Upload image</label>
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
        <label htmlFor="terms">Accept terms and conditions</label>
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
