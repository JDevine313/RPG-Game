import "./FightScreen.css";
import { Monster as M } from "../models/Monster";
import { Player as P } from "../models/Player";
import { useState } from "react";

interface Props {
  monster: M;
  player: P;
  monsterBasicAttack: () => void;
  playerBasicAttack: () => void;
  smallHealSpell: () => void;
  largeHealSpell: () => void;
  doubleSlash: () => void;
}

const FightScreen = ({
  monster,
  player,
  monsterBasicAttack,
  playerBasicAttack,
  smallHealSpell,
  largeHealSpell,
  doubleSlash,
}: Props) => {
  const [openSpells, setOpenSpells] = useState<boolean>(false);
  const [openSkills, setOpenSkills] = useState<boolean>(false);
  const [openItems, setOpenItems] = useState<boolean>(false);
  const handleTurn = (action: Function) => {
    if (monster.health > 0) {
      action();
      monsterBasicAttack();
    }
    setOpenSkills(false);
    setOpenSpells(false);
  };
  return (
    <div className="FightScreen">
      <div className="monster-side">
        <p>{monster.name}</p>
        <p>Health: {monster.health}HP</p>
        <img src={monster.img} alt="tutorial monster" />
      </div>
      <div className="player-side">
        <p>Heath: {player.health}HP</p>
        <p>Mana: {player.mana}MP</p>
        <ul>
          <li>
            <button onClick={() => handleTurn(() => playerBasicAttack())}>
              Attack
            </button>
          </li>
          <li>
            <button onClick={() => setOpenSkills(true)}>Skills</button>
            {openSkills && (
              <div>
                <ul className="moves">
                  <li>
                    <button
                      onClick={() =>
                        handleTurn(() => {
                          {
                            doubleSlash();
                          }
                        })
                      }
                    >
                      Double-Slash: {1 + player.level}MP
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <button onClick={() => setOpenSpells(true)}>Spells</button>
            {openSpells && (
              <div>
                <ul className="moves">
                  <li>
                    <button
                      onClick={() =>
                        handleTurn(() => {
                          {
                            smallHealSpell();
                          }
                        })
                      }
                    >
                      Small Heal: {4 + player.level}MP
                    </button>
                    {player.level > 3 && (
                      <button
                        onClick={() =>
                          handleTurn(() => {
                            {
                              largeHealSpell();
                            }
                          })
                        }
                      >
                        Large Heal: {9 + player.level}MP
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <button onClick={() => setOpenItems((prev) => !prev)}>Items</button>
            {openItems && (
              <ul>
                {player.items.map((item) => (
                  <li>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>Attack: {item.attack}</p>
                    <p>Magic: {item.magic}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FightScreen;
