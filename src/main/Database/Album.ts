
import { parse } from "path";
import { createTable, insertInto, select } from "sql-query-factory";

import { exec, get, all } from "./AsyncSQLite";

interface AlbumEntity {
  id: number;
  name: string;
  path: string;
}

export async function createTableAlbum() {
  const sql = createTable<AlbumEntity>("album").ifNotExist()
    .column("id").type("INTEGER").primaryKey().autoIncrement()
    .column("name").type("TEXT").notNull()
    .column("path").type("TEXT").notNull().build();
  return exec(sql);
}

function dirname(path: string) {
  return path.split("/").reverse()[0];
}

export async function indexAlbum(path: string) {
  const album = await selectAlbumByPath(path);
  if (album) {
    return album.id;
  }
  const name = dirname(path);
  const sql = insertInto<AlbumEntity>("album")
    .keys("name", "path")
    .values(name, path)
    .build();
  await exec(sql);
  return (await selectAlbumByPath(path))!.id;
}

async function selectAlbumByPath(path: string): Promise<AlbumEntity | null> {
  const sql = select("*")
    .from<AlbumEntity>("album")
    .where("path").equal(path).build();
  return get<AlbumEntity>(sql);
}

export async function selectAll() {
  const sql = select("*")
    .from<AlbumEntity>("album")
    .build();
  return all<AlbumEntity>(sql);
}
