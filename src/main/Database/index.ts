import { join, extname } from "path";

import { createDatabase } from "./AsyncSQLite";
import { createTableImage, indexImage } from "./Image";
import { createTableAlbum, indexAlbum } from "./Album";
import { readdir } from "../../utils/fs";
import { Queue } from "../../utils/Queue";
import { dispatchUpdateAlbum } from "../Dispatcher/Album";
import { dispatchUpdateImages } from "../Dispatcher/Image";

export async function initialize() {
  await createDatabase("./database.db");
  await createTableAlbum();
  await createTableImage();
}

const queue = new Queue();

export async function index(path: string) {
  const files = await readdir(path);
  const id = await indexAlbum(path);
  dispatchUpdateAlbum(id);
  files.filter(it => supported(extname(it))).forEach(file =>
    queue.add(async () => {
      await indexImage(id, join(path, file));
      console.log(path, file);
      dispatchUpdateImages(id);
    }));
}

function supported(extname: string) {
  switch(extname) {
    case ".jpg":
    case ".jpeg":
    case ".png":
      return true;
    default:
      return false;
  }
}
