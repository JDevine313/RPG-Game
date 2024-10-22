import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";

interface AuthContextModel {
  user: User | null;
  account: Account | null;
  getAccountAfterNewPlayer: () => void;
}

const defaultValues: AuthContextModel = {
  account: null,
  user: null,
  getAccountAfterNewPlayer() {},
};

const AuthContext = createContext(defaultValues);

export default AuthContext;
