import { motion } from "framer-motion";
import Item from "../models/Item";
import "./DroppedItem.css";

interface Props {
  item: Item;
  takeDroppedItem: (item: Item, take: boolean) => void;
}

const DroppedItem = ({ item, takeDroppedItem }: Props) => {
  return (
    <motion.div
      className="DroppedItem"
      initial={{
        scale: 0.1, // Start small
        opacity: 0, // Fully transparent
      }}
      animate={{
        scale: 1, // Scale to full size when open
        opacity: 1, // Fade in when open
      }}
      exit={{
        scale: 0.1, // Scale down when exiting
        opacity: 0, // Fade out when exiting
      }}
      transition={{ duration: 1 }}
    >
      <img src={item.img} alt={item.name} />
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>Attack: {item.attack}</p>
      <p>Magic: {item.magic}</p>
      <button onClick={() => takeDroppedItem(item, true)}>Take!</button>
      <button onClick={() => takeDroppedItem(item, false)}>Leave!</button>
    </motion.div>
  );
};

export default DroppedItem;
