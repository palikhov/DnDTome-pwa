export default class Gear {
  id?: number;
  name: string;
  sources: string;
  description: string;
  pic: string;
  cost: string;
  damage: string;
  weight: string;
  properties: string;
  type: string;
  filename: string;

  constructor();
  constructor(
    id?: number,
    name?: string,
    sources?: string,
    description?: string,
    pic?: string,
    cost?: string,
    damage?: string,
    weight?: string,
    properties?: string,
    type?: string,
    filename?: string
  ) {
    this.name = name || "";
    this.sources = sources || "";
    this.description = description || "";
    this.pic = pic || "";
    this.cost = cost || "";
    this.damage = damage || "";
    this.weight = weight || "";
    this.properties = properties || "";
    this.type = type || "";
    this.id = id;
    this.filename = filename || "";
  }
}

export function isGear(arg: any): arg is Gear {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const sourcesCheck =
    arg.sources !== undefined && typeof arg.sources == "string";
  const descriptionCheck =
    arg.description !== undefined && typeof arg.description == "string";
  const costCheck = arg.cost !== undefined && typeof arg.cost == "string";
  const damageCheck = arg.damage !== undefined && typeof arg.damage == "string";
  const weightCheck = arg.weight !== undefined && typeof arg.weight == "string";
  const propertiesCheck =
    arg.properties !== undefined && typeof arg.properties == "string";
  const typeCheck = arg.type !== undefined && typeof arg.type == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  return (
    arg &&
    nameCheck &&
    sourcesCheck &&
    descriptionCheck &&
    costCheck &&
    damageCheck &&
    weightCheck &&
    propertiesCheck &&
    typeCheck &&
    picCheck
  );
}
