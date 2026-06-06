import { useForm } from 'react-hook-form';
import type { IFormData, IFormProps } from './UncontrolledForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { convertToBase64, validateFile } from '../utils/fileValidation';

const formSchema = z
  .object({
    name: z.string().regex(/^[A-Z]/, 'First letter should be capital'),
    age: z.coerce
      .number()
      .min(1, 'Age must be at least 1')
      .max(99, 'Age must be at most 99'),
    email: z.string().email('Invalid email address'),
    gender: z.enum(['Man', 'Woman'], 'Choose gender'),
    terms: z.boolean(),
    password: z
      .string()
      .regex(/[0-9]/, 'Must contain a number')
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[a-z]/, 'Must contain lowercase')
      .regex(/[!@#$%^&*]/, 'Must contain special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'The passwords dont match',
    path: ['confirmPassword'],
  })
  .refine((checkboxValue) => checkboxValue.terms === true, {
    error: 'You must accept the terms to continue',
    path: ['terms'],
  });

export default function ControlledForm({ onSubmit, onClose }: IFormProps) {
  const [imageBase64, setImageBase64] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const onSubmitHandler = (data: IFormData) => {
    const formDataWithImage = {
      ...data,
      file: imageBase64,
    };
    console.log(formDataWithImage);
    onSubmit(formDataWithImage);
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
        <input type="radio" id="man" value="Man" {...register('gender')} />
        <label htmlFor="man">Man</label>
        <input type="radio" id="woman" value="Woman" {...register('gender')} />
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
