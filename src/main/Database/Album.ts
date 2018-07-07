import { TableSchema, createTable as createTableCore, buildValues, buildQueries } from "./";
import { exec, prepare, get, all } from "./AsyncSQLite";
import { Album } from "../../types/Album";

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
  type: "TEXT",
  unique: true,
}];

type InputRaw = {
  name?: string;
  path: string;
}

export async function createTable() {
  await createTableCore(TableName, TableSchema);
}

export async function addAlbum(album: InputRaw): Promise<Album> {
  await exec(
    `INSERT OR IGNORE INTO ${TableName} ${buildValues(album)}`
  );
  return await get(
    `SELECT * FROM ${TableName} WHERE ${buildQueries({ path: album.path, })}`
  );
}

export async function updateAlbum(album: Album) {
  const result = await exec(
    `UPDATE ${TableName} SET ${buildQueries({ name: album.name })} WHERE ${buildQueries({ id: album.id })}`
  );
  return result;
}

export async function getAlbum(id: number) {
  const result = await get(
    `SELECT * FROM ${TableName} WHERE ${buildQueries({ id, })}`
  ) as Album;
  return result;
}

export async function getAlbums() {
  const result = await all(
    `SELECT * FROM ${TableName}`
  ) as Album[];
  return result;
}
