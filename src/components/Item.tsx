import { useSelectedItemsStore, type IItem } from '../store/use-items-store';

interface ItemProps {
  item: IItem;
}

export default function Item({ item }: ItemProps) {
  const store = useSelectedItemsStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    store.toggleItem(item);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={store.isSelected(item.name)}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.description}</td>
    </tr>
  );
}
