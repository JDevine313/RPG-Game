import { Player } from "./Player";

export default interface Account {
  _id?: string;
  uid: string;
  displayName: string;
  player?: Player;
}
