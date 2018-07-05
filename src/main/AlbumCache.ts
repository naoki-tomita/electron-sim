import { addAlbum } from "./Database/Album";
import { readdir } from "../utils/fs";
import { getImages, updateImage, addImage } from "./Database/Image";
import { createThumbnail } from "./Thumbnail";
import { isExtImage } from "../utils/File";
import { join, extname } from "path";
import { dispatchUpdateAlbum, dispatchUpdateAlbums } from "./IPC/Album";
import { dispatchUpdateImage } from "./IPC/Image";

export async function createAlbumCache(path: string) {
  const album = await addAlbum({ path });
  dispatchUpdateAlbum(album.id);
  dispatchUpdateAlbums();

  const files = await readdir(path);
  const datas = files
    .filter(f => isExtImage(extname(f)))
    .map(f => ({
      album_id: album.id,
      path: join(path, f),
    }));
  for (const data of datas) {
    await addImage(data);
    dispatchUpdateAlbum(album.id);
  }

  const images = await getImages(album.id);
  for (const image of images) {
    const thumb = await createThumbnail(image.path, 400);
    await updateImage({ id: image.id }, { thumbnail: thumb.toString("base64") });
    dispatchUpdateAlbum(album.id);
    dispatchUpdateImage(image.id);
  }
}
