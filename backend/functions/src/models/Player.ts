import Item from "./Item";
import Skill from "./Skill";
import Spell from "./Spell";

export interface Player {
  name: string;
  level: number;
  mana: number;
  exp: number;
  attack: number;
  magic: number;
  skills: Skill[];
  spells: Spell[];
  items: Item[];
  health: number;
}
