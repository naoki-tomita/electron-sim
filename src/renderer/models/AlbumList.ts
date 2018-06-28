import { readdir, stat } from "../../utils/fs";
import { Observable } from "./Observable";
import { join } from "path";
import { AlbumCache } from "../../main/AlbumCache";

export interface AlbumItem {
  label: string;
  path: string;
}

export class AlbumList extends Observable {
  readonly root: string;
  readonly cache: AlbumCache;
  albums: AlbumItem[] = [];
  selectedItem: AlbumItem;
  constructor(root: string, cache: AlbumCache) {
    super();
    this.root = root;
    this.cache = cache;
    cache.onUpdate(async () => {
      this.albums = await cache.getAlbums();
      this.selectedItem = this.selectedItem || this.albums[0];
      this.triggerUpdate();
    });
    this.load();
  }

  async load() {
    const dirs = await readdir(this.root);
    for (const dir of dirs) {
      if ((await stat(join(this.root, dir))).isDirectory()) {
        await this.cache.addAlbum(join(this.root, dir));
      }
    }
  }

  select(item: AlbumItem) {
    this.selectedItem = item;
    this.triggerUpdate();
  }

  getAlbums() {
    return this.albums;
  }

  getSelectedAlbum() {
    return this.selectedItem;
  }
}
