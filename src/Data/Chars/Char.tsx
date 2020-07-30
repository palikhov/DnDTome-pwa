import Skills from "./Skills";
import Saves from "./Saves";
import Money from "./Money";
import IEntity from "../IEntity";
import ClassSet, { isClassSet } from "./ClassSet";
import RaceSet, { isRaceSet } from "./RaceSet";

export default class Char implements IEntity {
  id?: number;
  name: string;
  player: string;
  prof: string;
  level: number;
  pic: string;
  classes: ClassSet[];
  race: RaceSet;
  background: string;
  spells: string[];
  items: string[];
  ac: number;
  hp: number;
  currentHp: number;
  init: number;
  speed: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  saves: Saves;
  actions: string;
  bonusActions: string;
  reactions: string;
  features: string;
  profsLangs: string;
  senses: string;
  passivPerception: number;
  passivInsight: number;
  passivInvestigation: number;
  money: Money;
  skills: Skills;
  spellNotes: string;
  alignment: string;
  inspiration: number;
  castingHit: number;
  castingDC: number;

  constructor(
    id: number,
    name: string,
    player: string,
    prof: string,
    level: number,
    pic: string,
    classes: ClassSet[],
    race: RaceSet,
    background: string,
    spells: string[],
    items: string[],
    ac: number,
    hp: number,
    currentHp: number,
    init: number,
    speed: string,
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    saves: Saves,
    actions: string,
    bonusActions: string,
    reactions: string,
    features: string,
    profsLangs: string,
    senses: string,
    passivPerception: number,
    passivInsight: number,
    passivInvestigation: number,
    money: Money,
    skills: Skills,
    spellNotes: string,
    alignment: string,
    inspiration: number,
    castingHit: number,
    castingDC: number
  ) {
    this.id = id;
    this.name = name;
    this.player = player;
    this.prof = prof;
    this.level = level;
    this.pic = pic;
    this.classes = classes;
    this.race = race;
    this.background = background;
    this.spells = spells;
    this.items = items;
    this.ac = ac;
    this.hp = hp;
    this.currentHp = currentHp;
    this.init = init;
    this.speed = speed;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
    this.saves = saves;
    this.actions = actions;
    this.bonusActions = bonusActions;
    this.reactions = reactions;
    this.features = features;
    this.profsLangs = profsLangs;
    this.senses = senses;
    this.passivPerception = passivPerception;
    this.passivInsight = passivInsight;
    this.passivInvestigation = passivInvestigation;
    this.money = money;
    this.skills = skills;
    this.spellNotes = spellNotes;
    this.alignment = alignment;
    this.inspiration = inspiration;
    this.castingHit = castingHit;
    this.castingDC = castingDC;
  }
}

export function isChar(arg: any): arg is Char {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const playerCheck = arg.player !== undefined && typeof arg.player == "string";
  const profCheck = arg.prof !== undefined && typeof arg.prof == "number";
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const raceCheck = arg.race !== undefined && isRaceSet(arg.race);
  const backgroundCheck =
    arg.background !== undefined && typeof arg.background == "string";
  const acCheck = arg.ac !== undefined && typeof arg.ac == "number";
  const hpCheck = arg.hp !== undefined && typeof arg.hp == "number";
  const currentHpCheck =
    arg.currentHp !== undefined && typeof arg.currentHp == "number";
  const initCheck = arg.init !== undefined && typeof arg.init == "number";
  const classesCheck =
    arg.classes !== undefined &&
    Array.isArray(arg.classes) &&
    isClassSet(arg.classes[0]);
  return (
    arg &&
    nameCheck &&
    playerCheck &&
    profCheck &&
    levelCheck &&
    picCheck &&
    raceCheck &&
    backgroundCheck &&
    acCheck &&
    hpCheck &&
    currentHpCheck &&
    initCheck &&
    classesCheck
  );
}
