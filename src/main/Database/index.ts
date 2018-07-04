import { exec, createDatabase } from "./AsyncSQLite";
import { createTable as createAlbumTable } from "./Album";

export interface TableSchema {
  key: string
  type: "INTEGER" | "TEXT" | "BOOLEAN";
  nullable?: boolean;
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
  }`;
}

export async function createTable(
  table: string,
  schema: TableSchema[],
) {
  const builtSchema = schema.map(s => buildSchema(s));
  await exec(`CREATE TABLE IF NOT EXISTS ${table} (${builtSchema.join(",")});`);
}

/**
 * データベースの初期化
 * 必要なテーブル(なければ)を作る
 */
export async function initialize() {
  await createDatabase("./database.db");
  await createAlbumTable();
}
