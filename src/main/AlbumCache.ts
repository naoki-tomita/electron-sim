import { addAlbum } from "./Database/Album";
import { readdir } from "../utils/fs";
import { getImages, updateImage, addImage } from "./Database/Image";
import { createThumbnail } from "./Thumbnail";
import { isExtImage } from "../utils/File";
import { join, extname } from "path";
import { dispatchUpdateAlbum, dispatchUpdateAlbums } from "./IPC/Album";
import { dispatchUpdateImage } from "./IPC/Image";
import { Album } from "../types/Album";
import { wait } from "../utils/Wait";

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

let processing = false;
async function run() {
  if (processing) {
    return;
  }
  const album = que.shift();
  if (!album) {
    return;
  }
  console.log(`Processing for album`, album);
  processing = true;
  const files = await readdir(album.path);
  const datas = files
    .filter(f => isExtImage(extname(f)))
    .map(f => ({
      album_id: album.id,
      path: join(album.path, f),
    }));
  console.log(`Found files: ${datas.length}`);
  for (const data of datas) {
    await addImage(data);
  }

  const images = await getImages(album.id);
  for (const image of images) {
    if (!image.thumbnail) {
      console.log(`Create thumbnail for: ${image.id}`);
      const thumb = await createThumbnail(image.path, 256);
      await wait(1000);
      await updateImage({ id: image.id }, { thumbnail: thumb.toString("base64") });
      dispatchUpdateAlbum(album.id);
    }
  }
  processing = false;
  run();
}

export async function createAlbumCache(path: string) {
  const album = await createAlbumInfo(path);
  addQue(album);
  run();
}
