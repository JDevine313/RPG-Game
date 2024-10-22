import Item from "../models/Item";
import "./DroppedItem.css";

interface Props {
  item: Item;
  takeDroppedItem: (item: Item, take: boolean) => void;
}

const DroppedItem = ({ item, takeDroppedItem }: Props) => {
  return (
    <div className="DroppedItem">
      <img src={item.img} alt={item.name} />
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>Attack: {item.attack}</p>
      <p>Magic: {item.magic}</p>
      <button onClick={() => takeDroppedItem(item, true)}>Take!</button>
      <button onClick={() => takeDroppedItem(item, false)}>Leave!</button>
    </div>
  );
};

export default DroppedItem;
