import { Observable } from "./Observable";
import { readdir, readFile } from "../../utils/fs";
import { join, extname } from "path";
import { isImage } from "../../utils/File";
import { AlbumItem } from "./AlbumList";

export interface ImageItem {
  label: string;
  path: string;
  raw: string;
}

export class ImageList extends Observable {
  private path: string;
  private list?: ImageItem[];
  async setAlbum(item: AlbumItem) {
    const path = item.path;
    this.path = path;
    const list = (await readdir(path))
      .filter(name => isImage(extname(name)))
      .map(name => ({ label: name, path: join(path, name) }));
    this.list = await Promise.all(list.map(async l => ({ raw: (await readFile(l.path)).toString("base64"), ...l })));
    this.triggerUpdate();
  }

  getList(): ImageItem[] {
    return this.list || [];
  }
}