import { ObjectId } from "mongodb";
import { Player } from "./Player";

export default interface Account {
  _id?: ObjectId;
  uid: string;
  displayName: string;
  player?: Player;
}
