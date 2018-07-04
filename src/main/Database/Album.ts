import { TableSchema, createTable as createTableCore } from "./";
import { exec } from "./AsyncSQLite";

const TableName = "album";
const TableSchema: TableSchema[] = [{
  key: "id",
  type: "INTEGER",
  primaryKey: true,
}, {
  key: "name",
  type: "TEXT",
  nullable: true,
}, {
  key: "path",
  type: "TEXT"
}];

interface Raw {
  id?: number;
  name?: string;
  path: string;
}

export async function createTable() {
  await createTableCore(TableName, TableSchema);
}

export async function addAlbum(album: Raw) {
  await exec(
    `INSERT INTO ${TableName}(name, path) VALUES(${album.name ? `"${album.name}"` : null}, "${album.path}")`
  );
}

export async function addAlbums(...albums: Raw[]) {

}
