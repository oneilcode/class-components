import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().regex(/^[A-Z]/, 'First letter should be capital'),
    age: z.coerce
      .number()
      .min(1, 'Age must be at least 1')
      .max(99, 'Age must be at most 99'),
    email: z.email('Invalid email address'),
    gender: z.enum(['man', 'woman'], {
      message: 'Choose gender',
    }),
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
