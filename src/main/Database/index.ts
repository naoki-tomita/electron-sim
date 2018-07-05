import { exec, createDatabase } from "./AsyncSQLite";
import { createTable as createAlbumTable } from "./Album";
import { createTable as createImageTable } from "./Image";

export interface TableSchema {
  key: string
  type: "INTEGER" | "TEXT" | "BOOLEAN";
  nullable?: boolean;
  unique?: boolean;
  primaryKey?: boolean;
  default?: string | number;
}

function buildSchema(s: TableSchema) {
  return `${s.key} ${s.type} ${
    s.nullable ? "NULL" : "NOT NULL"
  } ${
    s.primaryKey ? "PRIMARY KEY AUTOINCREMENT" : ""
  } ${
    s.default != null ? `DEFAULT ${s.default}` : ""
  } ${
    s.unique ? "UNIQUE" : ""
  }`;
}

export async function createTable(
  table: string,
  schema: TableSchema[],
) {
  const builtSchema = schema.map(s => buildSchema(s));
  await exec(`CREATE TABLE IF NOT EXISTS ${table} (${builtSchema.join(",")});`);
}

function toDatabaseString(data: string | number | null | undefined) {
  if (data == null) {
    return "NULL";
  }
  switch (typeof data) {
    case "string":
      return `"${data}"`;
    case "number":
      return `${data}`;
    default:
      return "NULL";
  }
}

export function buildValues(raw: {
  [key: string]: string | number | null | undefined;
}) {
  const keys = Object.keys(raw);
  const values = keys.map(k => toDatabaseString(raw[k]));
  return `(${keys.join(",")}) VALUES(${values.join(",")})`
}

export function buildQueries(raw: {
  [key: string]: string | number | null | undefined;
}) {
  return Object.keys(raw)
    .filter(k => raw[k] != null)
    .map(k => `${k}=${toDatabaseString(raw[k])}`)
    .join(" ");
}

/**
 * データベースの初期化
 * 必要なテーブル(なければ)を作る
 */
export async function initialize() {
  await createDatabase("./database.db");
  await createAlbumTable();
  await createImageTable();
}
