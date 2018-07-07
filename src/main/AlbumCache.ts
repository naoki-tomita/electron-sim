import { addAlbum } from "./Database/Album";
import { readdir } from "../utils/fs";
import { getImages, updateImage, addImage } from "./Database/Image";
import { createThumbnail } from "./Thumbnail";
import { isExtImage } from "../utils/File";
import { join, extname } from "path";
import { dispatchUpdateAlbum, dispatchUpdateAlbums } from "./IPC/Album";
import { dispatchUpdateImage } from "./IPC/Image";
import { Album } from "../types/Album";

async function createAlbumInfo(path: string) {
  const album = await addAlbum({ path });
  dispatchUpdateAlbum(album.id);
  dispatchUpdateAlbums();
  return album;
}

const que: Album[] = [];
function addQue(album: Album) {
  que.push(album);
}

async function run() {
  const album = que.shift();
  if (!album) {
    return;
  }

  const files = await readdir(album.path);
  const datas = files
    .filter(f => isExtImage(extname(f)))
    .map(f => ({
      album_id: album.id,
      path: join(album.path, f),
    }));
  for (const data of datas) {
    const image = await addImage(data);
    dispatchUpdateAlbum(album.id);
    dispatchUpdateImage(image.id);
  }

  const images = await getImages(album.id);
  for (const image of images) {
    const thumb = await createThumbnail(image.path, 400);
    await updateImage({ id: image.id }, { thumbnail: thumb.toString("base64") });
    dispatchUpdateAlbum(album.id);
    dispatchUpdateImage(image.id);
  }

  run();
}

export async function createAlbumCache(path: string) {
  const album = await createAlbumInfo(path);
  addQue(album);
  run();
}
