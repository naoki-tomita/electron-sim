import { basename } from "path";
import { createTable, insertInto, select } from "sql-query-factory";

import { exec, get, all } from "./AsyncSQLite";
import { createThumbnail } from "../Thumbnail";

interface ImageEntity {
  id: number;
  album_id: number;
  name: string;
  path: string;
  thumbnail: string;
}

export async function createTableImage() {
  const sql = createTable<ImageEntity>("image").ifNotExist()
    .column("id").type("INTEGER").primaryKey().autoIncrement()
    .column("album_id").type("INTEGER").notNull()
    .column("name").type("TEXT").notNull()
    .column("path").type("TEXT").notNull()
    .column("thumbnail").type("TEXT").build();
  return exec(sql);
}

export async function indexImage(albumId: number, path: string) {
  const image = await selectImageByPath(path);
  if (image) {
    return;
  }
  const name = basename(path);
  const thumbnail = await createThumbnail(path, 420);
  const sql = insertInto<ImageEntity>("image")
    .keys("album_id", "name", "path", "thumbnail")
    .values(albumId, name, path, thumbnail.toString("base64"))
    .build();
  return exec(sql);
}

async function selectImageByPath(path: string) {
  const sql = select("*")
    .from<ImageEntity>("image")
    .where("path").equal(path)
    .build();
  return get<ImageEntity>(sql);
}

export async function selectByAlbumId(albumId: number) {
  const sql = select("*")
    .from<ImageEntity>("image")
    .where("album_id").equal(albumId)
    .build();
  return all<ImageEntity>(sql);
}
