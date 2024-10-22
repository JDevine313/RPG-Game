import "./Tile.css";
import { Tile as T } from "../models/Tile";
interface Props {
  tile: T;
}

const Tile = ({ tile }: Props) => {
  return (
    <div className="Tile">
      {tile.occupied && (
        <>
          <p>{tile.occupent.name}</p>
          {tile.type === "player" ? (
            <p>Level: {tile.occupent.level}</p>
          ) : tile.type === "monster" ? (
            <img src={tile.occupent.img} alt={tile.occupent.name} />
          ) : (
            <></>
          )}
          <p>HP: {tile.occupent.health}</p>
        </>
      )}
    </div>
  );
};

export default Tile;
