interface IButtonProps {
  title: string;
  onClick: () => void;
}

export default function OpenModalBtn({ title, onClick }: IButtonProps) {
  return <button onClick={onClick}> {title}</button>;
}
