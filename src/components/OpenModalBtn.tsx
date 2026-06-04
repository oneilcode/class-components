interface IButtonProps {
  title: string;
}

export default function OpenModalBtn({ title }: IButtonProps) {
  return <button> {title}</button>;
}
