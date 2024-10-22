import { useContext, useEffect, useState } from "react";
import { Player } from "../models/Player";
import "./HomeRoute.css";
import Tile from "./Tile";
import { Monster } from "../models/Monster";
import NewPlayerForm from "./NewPlayerForm";
import { Tile as T } from "../models/Tile";
import FightScreen from "./FightScreen";
import AuthContext from "../context/AuthContext";
import Header from "./Header";
import { deletePlayer, updatePlayer } from "../services/authServices";
import tutorereel from "../assets/tut-ore-reel.svg";
import slimeImg from "../assets/slime-cropped.svg";
import boarImg from "../assets/boar-cropped.svg";
import goblinImg from "../assets/goblin-cropped.svg";
import werewolfImg from "../assets/werewolf-6704464_1920.png";
import weakSwordImg from "../assets/weak-sword.svg";
import sturdySwordImg from "../assets/sturdy-sword.svg";
import weakOrbImg from "../assets/weak-orb.svg";
import sturdyOrbImg from "../assets/sturdy-orb.svg";
import davieBonesImg from "../assets/skeleton-cropped.svg";
import Item from "../models/Item";
import DroppedItem from "./DroppedItem";

const HomeRoute = () => {
  const [tiles, setTiles] = useState<T[]>([]);
  const [monster, setMonster] = useState<Monster | null>({
    name: "tut-ore reel",
    exp: 11,
    img: tutorereel,
    level: 0,
    maxHit: 0,
    health: 40,
  });
  const [player, setPlayer] = useState<Player>();
  const [index, setIndex] = useState<number>(22);
  const [droppedItem, setDroppedItem] = useState<Item | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const { account, getAccountAfterNewPlayer } = useContext(AuthContext);

  const spawnMonsters = (level: number) => {
    let monsters: Monster[] = [
      {
        name: "slime",
        level: level,
        health: 3 * level,
        img: slimeImg,
        maxHit: 1 + level,
        exp: 1,
      },
      {
        name: "goblin",
        level: level,
        img: goblinImg,
        health: 4 * level,
        exp: 2,
        maxHit: 3 + level,
      },
      {
        name: "boar",
        level: level,
        health: 5 * level,
        img: boarImg,
        exp: 2,
        maxHit: 2 + level,
      },
      {
        name: "werewolf",
        level: level,
        health: 12 * level,
        img: werewolfImg,
        exp: 5,
        maxHit: 4 + level,
      },
    ];

    setTiles((prev) => {
      let copy = prev.slice();
      monsters.forEach((monster) => {
        let i = Math.floor(Math.random() * 24);

        while (copy[i].occupied || i === index) {
          i = Math.floor(Math.random() * 24);
        }

        copy[i] = {
          occupied: true,
          occupent: monster,
          type: "monster",
        };
      });
      return copy;
    });
  };
  const spawnBoss = () => {
    let boss1: Monster = {
      name: "Davie Bones",
      level: 5,
      health: 30 * 5,
      img: davieBonesImg,
      exp: 10,
      maxHit: 6 + 5,
    };
    setIndex(22);
    setTiles((prev) => {
      let copy = prev.slice();
      let i = copy.findIndex((item) => item.type === "player");
      copy[i] = { occupied: false, occupent: {}, type: "empty" };
      copy[index] = { occupied: true, occupent: player, type: "player" };
      copy[7] = { occupied: true, occupent: boss1, type: "monster" };
      return copy;
    });
  };
  const spawnItems = (): Item | null => {
    let items1: Item[] = [
      {
        name: "Weak Sword",
        description: "Better than nothing but could break any swing.",
        attack: 1,
        magic: 0,
        teir: 1,
        img: weakSwordImg,
      },
      {
        name: "Faint Magic Orb",
        description: "You can sense a faint magical essence left over",
        attack: 0,
        magic: 1,
        teir: 1,
        img: weakOrbImg,
      },
    ];
    let items2 = [
      {
        name: "Iron Sword",
        description: "Made from Iron, surpisingly rust free!",
        attack: 3,
        magic: 0,
        teir: 2,
        img: sturdySwordImg,
      },
      {
        name: "Glowing Magic Orb",
        description:
          "The orb glows a deep red, you feel magic power well up inside you when you hold it.",
        attack: 0,
        magic: 3,
        teir: 2,
        img: sturdyOrbImg,
      },
    ];
    let items3 = [
      {
        name: "Steel Sword",
        description: "Made from Steel, sharpened to a razors edge",
        attack: 5,
        magic: 0,
        teir: 3,
        img: sturdySwordImg,
      },
      {
        name: "Brilliant Magic Orb",
        description:
          "The orb glows a vibrant red, you feel waves of magic pulsing from it.",
        attack: 0,
        magic: 5,
        teir: 3,
        img: sturdyOrbImg,
      },
    ];
    if (player) {
      if (player.level < 3) {
        let i = Math.floor(Math.random() * items1.length);
        return items1[i];
      } else if (player.level < 6) {
        let i = Math.floor(Math.random() * items2.length);
        return items2[i];
      } else {
        let i = Math.floor(Math.random() * items2.length);
        return items3[i];
      }
    }
    return null;
  };

  useEffect(() => {
    let numOfMonsters = tiles.filter((item) => item.type === "monster").length;
    if (player?.level === 6) {
      spawnBoss();
      updatePlayer(player, account?._id!);
    } else if (numOfMonsters === 0 && player) {
      spawnMonsters(player.level);
      updatePlayer(player, account?._id!);
    }
  }, [player?.level]);

  useEffect(() => {
    setTiles(
      Array.from(Array(25), () => ({
        occupied: false,
        occupent: {},
        type: "empty",
      }))
    );
    if (account) {
      setPlayer(account.player);
      if (account.player && account.player.level > 1) {
        setMonster(null);
      }
    }
  }, [account]);

  const checkIsDead = () => {
    if (monster && player) {
      if (monster.health <= 0) {
        setMonster(null);
        setPlayer((prev: any) => {
          let copy = { ...prev };
          copy.exp += monster.exp;
          copy.level = Math.ceil(copy.exp / 10);
          copy.mana += copy.items.reduce(
            (ac: any, cv: any) => ac + cv.magic,
            0
          );
          if (copy.level > prev.level) {
            // level up
            copy.health = 15 * copy.level;
            copy.mana = 7 * copy.level;
            copy.attack = Math.ceil(copy.level / 5);
            copy.magic = Math.ceil(copy.level / 5);
          }
          return copy;
        });

        let num = Math.floor(Math.random() * 4);
        if (num === 3) {
          setDroppedItem(spawnItems());
        }
      } else if (player.health <= 0) {
        setGameOver(true);
      }
    }
  };

  const takeDroppedItem = (item: Item, take: boolean) => {
    if (player) {
      if (take) {
        setPlayer((prev) => {
          if (prev) {
            let copy = { ...prev };
            if (copy.items.some((ele) => ele.name === item.name)) {
              console.log("already have that item");
            } else {
              copy.items.push(item);
            }
            return copy;
          }
        });
      }
      setDroppedItem(null);
    }
  };

  useEffect(() => {
    checkIsDead();
  }, [monster]);

  useEffect(() => {
    if (index > -1 && index < tiles.length) {
      if (tiles[index].type === "monster" && player?.level! > 1) {
        setMonster(tiles[index].occupent);
      }
      setTiles((prev) => {
        let copy = prev.slice();
        let i = copy.findIndex((item) => item.type === "player");
        copy[i] = { occupied: false, occupent: {}, type: "empty" };
        copy[index] = { occupied: true, occupent: player, type: "player" };
        return copy;
      });
    }
  }, [index, player]);
  //   attacking
  console.log(player);
  const playerBasicAttack = () => {
    if (player && monster) {
      setMonster((prev: any) => {
        let copy = { ...prev };
        let itemBuffs = player.items.reduce((ac, cv) => ac + cv.attack, 0);

        let num =
          Math.floor(Math.random() * (4 + player.attack)) +
          player.attack +
          itemBuffs +
          player.level;

        copy.health -= num;
        if (copy.health < 0) {
          copy.health = 0;
        }
        return copy;
      });
    }
  };

  const monsterBasicAttack = () => {
    if (player && monster) {
      setPlayer((prev: any) => {
        let copy = { ...prev };
        let num = Math.floor(Math.random() * monster.maxHit) + monster.level;
        copy.health -= num;
        if (copy.health < 0) {
          copy.health = 0;
        }
        return copy;
      });
    }
  };
  // Spells
  const smallHealSpell = () => {
    if (player && player.mana >= 4 + player.level) {
      setPlayer((prev: any) => {
        let copy = { ...prev };
        let num =
          Math.floor(Math.random() * (8 + player.level * 2)) + player.level * 2;
        copy.health += num;
        copy.mana -= 4 + player.level;
        return copy;
      });
    }
  };
  const largeHealSpell = () => {
    if (player && player.mana >= 8 + player.level) {
      setPlayer((prev: any) => {
        let copy = { ...prev };
        let num =
          Math.floor(Math.random() * (20 + player.level * 3)) +
          player.level * 3;
        copy.health += num;
        copy.mana -= 8 + player.level;
        return copy;
      });
    }
  };
  // Skills
  const doubleSlash = () => {
    if (player && player.mana >= 1 + player.level) {
      setPlayer((prev: any) => {
        let copy = { ...prev };
        copy.mana -= 1 + player.level;
        return copy;
      });
      if (monster && player) {
        setMonster((prev: any) => {
          let copy = { ...prev };
          let itemBuffs = player.items.reduce((ac, cv) => ac + cv.attack, 0);
          let slash1 =
            Math.floor(Math.random() * 3) +
            player.attack +
            itemBuffs +
            player.level;
          let slash2 =
            Math.floor(Math.random() * 3) +
            player.attack +
            itemBuffs +
            player.level;

          copy.health -= slash1;
          copy.health -= slash2;
          return copy;
        });
      }
    }
  };
  const newPlayerAdd = (playerName: string) => {
    if (account) {
      updatePlayer(
        {
          name: playerName,
          level: 1,
          health: 10,
          mana: 5,
          attack: 1,
          magic: 1,
          exp: 0,
          skills: [],
          spells: [],
          items: [],
        },
        account._id!
      ).then(() => {
        getAccountAfterNewPlayer();
      });
    }
  };

  const handleRestart = () => {
    if (account) {
      deletePlayer(account._id!).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="HomeRoute">
      <Header player={player} />
      {!player && <NewPlayerForm newPlayerAdd={newPlayerAdd} />}
      {droppedItem && (
        <DroppedItem item={droppedItem} takeDroppedItem={takeDroppedItem} />
      )}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={() => handleRestart()}>RESTART</button>
          <button onClick={() => window.location.reload()}>
            LOAD FROM LAST SAVE
          </button>
        </div>
      )}
      {/* game board */}
      {player && !monster && (
        <>
          <h1>Dungeon Level: {player.level - 1}</h1>
          <ul id="game-board">
            {tiles.map((tile, i) => (
              <Tile key={i} tile={tile} />
            ))}
          </ul>
          <div className="controls">
            <button
              onClick={() =>
                setIndex((prev) => (prev - 5 > -1 ? prev - 5 : prev))
              }
              className="up"
            >
              <i className="fa-solid fa-up-long"></i>
            </button>
            <button
              onClick={() =>
                setIndex((prev) => (prev + 5 < tiles.length ? prev + 5 : prev))
              }
              className="down"
            >
              <i className="fa-solid fa-down-long"></i>
            </button>
            <button
              onClick={() =>
                setIndex((prev) => (prev - 1 > -1 ? prev - 1 : prev))
              }
              className="left"
            >
              <i className="fa-solid fa-left-long"></i>
            </button>
            <button
              onClick={() =>
                setIndex((prev) => (prev + 1 < tiles.length ? prev + 1 : prev))
              }
              className="right"
            >
              <i className="fa-solid fa-right-long"></i>
            </button>
          </div>
        </>
      )}
      {monster && player && (
        <FightScreen
          player={player}
          monster={monster}
          monsterBasicAttack={monsterBasicAttack}
          playerBasicAttack={playerBasicAttack}
          smallHealSpell={smallHealSpell}
          largeHealSpell={largeHealSpell}
          doubleSlash={doubleSlash}
        />
      )}
    </div>
  );
};

export default HomeRoute;
