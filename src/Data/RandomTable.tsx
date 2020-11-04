import IEntity from "./IEntity";

export default class RandomTable implements IEntity {
  id?: number;
  name: string;
  header: string;
  rows: string[];
  filename?: string;

  constructor(
    id?: number,
    name?: string,
    filename?: string,
    header?: string,
    rows?: string[]
  ) {
    this.id = id;
    this.filename = filename || "";
    this.name = name || "";
    this.header = header || "";
    this.rows = rows || [];
  }
}

export function isRandomTable(arg: any): arg is RandomTable {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const headerCheck = arg.header !== undefined && typeof arg.header == "string";
  const rowsCheck =
    arg.rows !== undefined &&
    Array.isArray(arg.rows) &&
    typeof arg.rows[0] == "string";

  return arg && nameCheck && headerCheck && rowsCheck;
}

export function findRandomTableFormattError(
  arg: any
): {
  nameCheck: boolean;
  headerCheck: boolean;
  rowsCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const headerCheck = arg.header !== undefined && typeof arg.header == "string";
  const rowsCheck =
    arg.rows !== undefined &&
    Array.isArray(arg.rows) &&
    typeof arg.rows[0] == "string";

  return {
    nameCheck: nameCheck,
    headerCheck: headerCheck,
    rowsCheck: rowsCheck,
  };
}
