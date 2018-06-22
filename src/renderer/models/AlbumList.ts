import { readdir } from "../../utils/fs";
import { Observable } from "./Observable";
import { join } from "path";

export interface AlbumItem {
  label: string;
  path: string;
}

export class AlbumList extends Observable {
  readonly root: string;
  selectedItem: AlbumItem;
  albums: AlbumItem[] = [];
  constructor(root: string) {
    super();
    this.root = root;
    this.update();
  }
  async update() {
    const dirs = await readdir(this.root);
    this.albums = dirs.map(dir => ({
      label: dir,
      path: join(this.root, dir),
    }));
    if (!this.selectedItem) {
      this.selectedItem = this.albums[0];
    }
    this.triggerUpdate();
  }

  select(item: AlbumItem) {
    this.selectedItem = item;
    this.triggerUpdate();
  }
}
