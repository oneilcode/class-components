import { useSelectedItemsStore, type IItem } from '../store/use-items-store';

interface ItemProps {
  item: IItem;
}

export default function Item({ item }: ItemProps) {
  const { isSelected, toggleItem } = useSelectedItemsStore();

  const clickOnCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(item);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isSelected(item.id)}
          onClick={clickOnCheckbox}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.description}</td>
    </tr>
  );
}
