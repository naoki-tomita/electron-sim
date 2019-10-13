import { basename } from "path";
import { createTable, insertInto, select } from "sql-query-factory";

import { exec, get, all } from "./AsyncSQLite";
import { createThumbnail, createExif } from "../ImageMetadata";
import { stat } from "../../utils/fs";

interface ImageEntity {
  id: number;
  album_id: number;
  name: string;
  path: string;
  date: string;
  orientation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  thumbnail: string;
}

export async function createTableImage() {
  const sql = createTable<ImageEntity>("image").ifNotExist()
    .column("id").type("INTEGER").primaryKey().autoIncrement()
    .column("album_id").type("INTEGER").notNull()
    .column("name").type("TEXT").notNull()
    .column("path").type("TEXT").notNull()
    .column("date").type("TEXT").notNull()
    .column("orientation").type("INTEGER").notNull()
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
  const exif = await createExif(path);
  const sql = insertInto<ImageEntity>("image")
    .keys("album_id", "name", "path", "date", "orientation", "thumbnail")
    .values(albumId, name, path, exif ? exif.exif.DateTimeOriginal: "", exif ? exif.image.Orientation : 1, thumbnail.toString("base64"))
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
