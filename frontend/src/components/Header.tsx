import { useContext } from "react";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import AuthContext from "../context/AuthContext";
import { updatePlayer } from "../services/authServices";
import { Player } from "../models/Player";

interface Props {
  player: Player | undefined;
}

const Header = ({ player }: Props) => {
  const { account } = useContext(AuthContext);
  return (
    <div className="Header">
      {account ? (
        <button onClick={() => signOut()}>sign out</button>
      ) : (
        <button onClick={() => signInWithGoogle()}>sign in</button>
      )}
    </div>
  );
};

export default Header;
