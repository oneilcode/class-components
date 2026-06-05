export interface IFormData {
  name: string;
  age: number;
  email: string;
  gender: 'Man' | 'Woman';
  terms: boolean;
}

export interface IFormProps {
  onSubmit: (data: IFormData) => void;
  onClose: () => void;
}

export default function UncontrolledForm({ onSubmit, onClose }: IFormProps) {
  const formAction = (formData: FormData) => {
    const data: IFormData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      gender: formData.get('gender') === 'man' ? 'Man' : 'Woman',
      terms: formData.get('terms') === 'on',
    };

    onSubmit(data);
    onClose();
  };

  return (
    <form className="form" action={formAction}>
      <div className="form-input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>

      <div className="form-input">
        <label htmlFor="age">Age</label>
        <input type="text" name="age" id="age" />
      </div>

      <div className="form-input">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>

      <div className="form-input">
        <input type="radio" name="gender" id="man" value="man" />
        <label htmlFor="man">Man</label>
        <input type="radio" name="gender" id="woman" value="woman" />
        <label htmlFor="woman">Woman</label>
      </div>

      <div className="form-input">
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms">Accept terms and conditions</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
