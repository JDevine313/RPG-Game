import Skill from "./Skill";
import Spell from "./Spell";

export interface Monster {
  name: string;
  level: number;
  health: number;
  exp: number;
  img: string;
  maxHit: number;
  skills?: Skill[];
  spells?: Spell[];
}
