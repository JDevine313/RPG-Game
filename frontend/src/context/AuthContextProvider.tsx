import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import Account from "../models/Account";
import { createAccount, getAccountById } from "../services/authServices";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
        getAccountById(newUser.uid)
          .then((res) => {
            if (res) {
              setAccount(res);
            }
          })
          .catch(() => {
            createAccount({
              uid: newUser.uid,
              displayName: newUser.displayName || "",
            }).then((res) => {
              setAccount(res);
            });
          });
      }
    });
  }, []);

  const getAccountAfterNewPlayer = () => {
    getAccountById(account?.uid!).then((res) => setAccount(res));
  };

  return (
    <AuthContext.Provider value={{ user, account, getAccountAfterNewPlayer }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
