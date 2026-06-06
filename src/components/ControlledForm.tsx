import { useForm } from 'react-hook-form';
import type { IFormData, IFormProps } from './UncontrolledForm';

export default function ControlledForm({ onSubmit, onClose }: IFormProps) {
  const { register, handleSubmit } = useForm<IFormData>();
  const onSubmitHandler = (data: IFormData) => {
    console.log(data);
    onSubmit(data);
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
      </div>

      <div className="form-input">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register('age', { required: true })}
        />
      </div>

      <div className="form-input">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register('email', { required: true })}
        />
      </div>

      <div className="form-input">
        <input type="radio" id="man" value="man" {...register('gender')} />
        <label htmlFor="man">Man</label>
        <input type="radio" id="woman" value="woman" {...register('gender')} />
        <label htmlFor="woman">Woman</label>
      </div>

      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
      </div>

      <div className="form-input">
        <label htmlFor="confirm">Сonfirm password</label>
        <input
          type="password"
          id="confirm"
          {...register('confirm', { required: true })}
        />
      </div>

      <div className="form-input">
        <label htmlFor="file">Upload image</label>
        <input
          type="file"
          id="file"
          {...register('file', { required: false })}
        />
      </div>

      <div className="form-input">
        <input type="checkbox" id="terms" {...register('terms')} />
        <label htmlFor="terms">Accept terms and conditions</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
