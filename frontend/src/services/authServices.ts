import axios from "axios";
import Account from "../models/Account";
import { Player } from "../models/Player";

const baseUrl = import.meta.env.VITE_BASE_URL || "";

export const getAccountById = async (uid: string): Promise<Account> => {
  return (await axios.get(`${baseUrl}/account/${uid}`)).data;
};

export const createAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/account`, account)).data;
};

export const updatePlayer = async (
  player: Player,
  id: string
): Promise<Player> => {
  return (
    await axios.patch(`${baseUrl}/account/update-player/${id}`, { player })
  ).data;
};

export const deletePlayer = async (id: string): Promise<Account> => {
  return (await axios.patch(`${baseUrl}/account/delete-player/${id}`, {})).data;
};
