import { Observable } from "./Observable";
import { readdir, readFile } from "../../utils/fs";
import { join, extname } from "path";
import { isImage } from "../../utils/File";
import { AlbumItem } from "./AlbumList";

export interface ImageItem {
  label: string;
  path: string;
  buf: Buffer;
}

export class ImageList extends Observable {
  path: string;
  list?: ImageItem[];
  async setAlbum(item: AlbumItem) {
    const path = item.path;
    this.path = path;
    const list = (await readdir(path))
      .filter(name => isImage(extname(name)))
      .map(name => ({ label: name, path: join(path, name) }));
    this.list = await Promise.all(list.map(async l => ({ buf: await readFile(l.path), ...l })));
    console.log(this.list);
    this.triggerUpdate();
  }
}