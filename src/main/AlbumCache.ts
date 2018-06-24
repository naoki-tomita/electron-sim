import { basename, extname, join } from "path";
import { addAlbum, getAlbumId, addThumbnails, initialize, getAlbumThumbnails } from "./AlbumDatabase";
import { readdir } from "../utils/fs";
import { isImage } from "../utils/File";
import { ImageItem } from "../renderer/models/ImageList";
import { createThumbnail } from "./Thumbnail";
import { Observable } from "../renderer/models/Observable";
import { AlbumItem } from "../renderer/models/AlbumList";


export class AlbumCache extends Observable {
  readonly width: number;
  constructor(width: number) {
    super();
    this.width = width;
  }
  async init() {
    await initialize("./database.db");
  }

  async addAlbum(path: string) {
    const albumItem = {
      label: basename(path),
      path,
    };
    await addAlbum(albumItem);
    const id = await getAlbumId(albumItem);
    if (!id) {
      return;
    }

    const imageThumbs: ImageItem[] = await Promise.all((await readdir(path))
      .filter(x => isImage(extname(x)))
      .map(async x => ({
        label: x,
        path: join(path, x),
        raw: (await createThumbnail(join(path, x), this.width)).toString("base64"),
      })));

    await addThumbnails(id, imageThumbs);
    this.triggerUpdate();
  }

  async getAlbumTumbnails(albumItem: AlbumItem) {
    const id = await getAlbumId(albumItem);
    if (id) {
      return (await getAlbumThumbnails(id)) || [];
    }
    return [];
  }
}