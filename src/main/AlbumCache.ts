import { basename, extname, join } from "path";
import {
  addAlbum,
  getAlbumId,
  addThumbnails,
  initialize,
  getAlbumThumbnails,
  getAlbums,
  getAlbum,
  getThumbnail,
} from "./AlbumDatabase";
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

    if ((await getAlbumId(albumItem)) == null) {
      await addAlbum(albumItem);
    }
    const id = await getAlbumId(albumItem);
    if (!id) {
      return;
    }

    const list = (await readdir(path));
    const dirs = await list.filter(x => isImage(extname(x)));
    const imageThumbs: ImageItem[] = [];
    for (const dir of dirs) {
      if (
        (await getThumbnail({
          path: join(path, dir),
        })) == null
      ) {
        imageThumbs.push({
          label: dir,
          path: join(path, dir),
          raw: (await createThumbnail(join(path, dir), this.width)).toString("base64"),
        });
      }
    }

    await addThumbnails(id, imageThumbs);
    this.triggerUpdate();
  }

  async getAlbums() {
    return await getAlbums();
  }

  async getAlbumTumbnails(albumItem: AlbumItem) {
    const id = await getAlbumId(albumItem);
    if (id) {
      return (await getAlbumThumbnails(id)) || [];
    }
    return [];
  }
}