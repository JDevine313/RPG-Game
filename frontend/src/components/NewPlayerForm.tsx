import { FormEvent, useState } from "react";
import "./NewPlayerForm.css";

interface Props {
  newPlayerAdd: (playerName: string) => void;
}

const NewPlayerForm = ({ newPlayerAdd }: Props) => {
  const [playerName, setPlayerName] = useState<string>("");

  const handleSubmitCreatePlayer = (e: FormEvent) => {
    e.preventDefault();
    newPlayerAdd(playerName);
    setPlayerName("");
  };
  return (
    <form className="NewPlayerForm" onSubmit={handleSubmitCreatePlayer}>
      <label htmlFor="player-name">Your Name:</label>
      <input
        type="text"
        name="player-name"
        id="player-name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button>submit</button>
    </form>
  );
};

export default NewPlayerForm;
