import { TableSchema, createTable as createTableCore, buildQueries, buildValues } from "./";
import { exec, get, all } from "./AsyncSQLite";
import { Image } from "../../types/Images";

const TableName = "image";
const TableSchema: TableSchema[] = [{
  key: "id",
  type: "INTEGER",
  primaryKey: true,
}, {
  key: "album_id",
  type: "INTEGER",
}, {
  key: "name",
  type: "TEXT",
  nullable: true,
}, {
  key: "path",
  type: "TEXT",
  unique: true,
}, {
  key: "thumbnail",
  type: "TEXT",
  nullable: true,
}];

type InputRaw = {
  album_id: number;
  name?: string;
  path: string;
  thumbnail?: string;
}

export async function createTable() {
  await createTableCore(TableName, TableSchema);
}

export async function addImage(image: InputRaw) {
  await exec(
    `INSERT OR IGNORE INTO ${TableName}${buildValues(image)}`
  );
  return await get(`SELECT * FROM ${TableName} WHERE ${buildQueries({ path: image.path, })}`) as Image;
}

export async function updateImage(queries: {
  id?: number;
  path?: string;
}, image: {
  name?: string;
  thumbnail?: string;
}) {
  await exec(`UPDATE ${TableName} SET ${buildQueries(image)} WHERE ${buildQueries(queries)}`);
}

export async function getImage(id: number) {
  return await get(`SELECT * FROM ${TableName} WHERE ${buildQueries({ id, })}`) as Image;
}

export async function getImages(albumId?: number) {
  let result: Image[];
  if (albumId != null) {
    result = await all(
      `SELECT * FROM ${TableName} WHERE ${buildQueries({ album_id: albumId, })}`
    ) as Image[];
  } else {
    result = await all(
      `SELECT * FROM ${TableName}`
    ) as Image[];
  }
  return result;
}
