import "./FightScreen.css";
import { Monster as M } from "../models/Monster";
import { Player as P } from "../models/Player";
import { useState } from "react";
import { motion, useAnimate } from "framer-motion";

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
  const [openStats, setOpenStats] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const handleTurn = (action: Function) => {
    if (monster.health > 0) {
      action();
      animate(
        "img",
        { x: [0, -10, 10, -10, 10, 0] },
        {
          duration: 1,
          stiffness: 10,
        }
      );
      monsterBasicAttack();
    }
    setOpenSkills(false);
    setOpenSpells(false);
  };
  return (
    <motion.div
      className="FightScreen"
      initial={{
        scale: 0.1, // Start small
        opacity: 0, // Fully transparent
      }}
      animate={{
        scale: 1, // Scale to full size when open
        opacity: 1, // Fade in when open
      }}
      exit={{
        scale: 0.1, // Scale down when exiting
        opacity: 0, // Fade out when exiting
      }}
      transition={{ duration: 1 }}
    >
      <div className="monster-side" ref={scope}>
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
                      title="Two quick slashes. First: 50% attack, Second: 100% attack"
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
                      title="Quick heal scaling off your players magic."
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
                        title="Large Heal using every MP point converting it to HP at 1:1"
                      >
                        Large Heal: {player.mana}MP={player.mana}HP
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
          <li>
            <button onClick={() => setOpenStats((prev) => !prev)}>
              Player Stats
            </button>
            {openStats && (
              <ul>
                <li>
                  <p>Level: {player.level}</p>
                  <p>Health Points: {player.health}</p>
                  <p>Mana Points: {player.mana}</p>
                  <p>Attack: {player.attack}</p>
                  <p>Magic: {player.magic}</p>
                  <p>
                    Experience: {player.exp}/{player.level * 10}
                  </p>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default FightScreen;
