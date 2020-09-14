export default class Item {
  id?: number;
  name: string;
  sources: string;
  description: string;
  pic: string;
  rarity: string;
  magicBonus: number;
  attunment: number;
  base: string;
  type: string;
  filename: string;

  constructor();
  constructor(
    id?: number,
    name?: string,
    sources?: string,
    description?: string,
    pic?: string,
    rarity?: string,
    magicBonus?: number,
    attunment?: number,
    base?: string,
    type?: string,
    filename?: string
  ) {
    this.name = name || "";
    this.sources = sources || "";
    this.description = description || "";
    this.pic = pic || "";
    this.rarity = rarity || "";
    this.magicBonus = magicBonus || 0;
    this.attunment = attunment || 0;
    this.base = base || "";
    this.type = type || "";
    this.id = id;
    this.filename = filename || "";
  }
}

export function isItem(arg: any): arg is Item {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  const descriptionCheck =
    arg.description !== undefined && typeof arg.description == "string";
  const magicBonusCheck =
    arg.magicBonus !== undefined && typeof arg.magicBonus == "number";
  const attunmentCheck =
    arg.attunment !== undefined && typeof arg.attunment == "number";
  const rarityCheck = arg.rarity !== undefined && typeof arg.rarity == "string";
  const baseCheck = arg.base !== undefined && typeof arg.base == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  return (
    arg &&
    nameCheck &&
    sourcesCheck &&
    descriptionCheck &&
    magicBonusCheck &&
    attunmentCheck &&
    rarityCheck &&
    baseCheck &&
    typeCheck &&
    picCheck
  );
}
