import { Observable } from "./Observable";
import { readdir, readFile } from "../../utils/fs";
import { join, extname } from "path";
import { isImage } from "../../utils/File";
import { AlbumItem } from "./AlbumList";
import { AlbumCache } from "../../main/AlbumCache";

export interface ImageItem {
  label: string;
  path: string;
  raw: string;
}

export class ImageList extends Observable {
  path: string;
  readonly cache: AlbumCache;
  list?: ImageItem[];
  constructor(cache: AlbumCache) {
    super();
    this.cache = cache;
  }

  async setAlbum(item: AlbumItem) {
    this.list = await this.cache.getAlbumTumbnails(item);
    this.triggerUpdate();
  }

  getList(): ImageItem[] {
    return this.list || [];
  }
}