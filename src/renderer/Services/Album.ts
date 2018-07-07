import { ipcRenderer } from "electron";
import { Album } from "../../types/Album";
import { send } from "./IPC";
import { Image } from "../../types/Images";

export async function getAlbums() {
  const result = await send<Album[]>("album:list");
  return result;
}

export async function getAlbumImages(id: number) {
  console.time("getAlbumImages");
  const result = await send<Image[]>("album:image:list", { id, });
  console.timeEnd("getAlbumImages");
  return result;
}

export async function postAlbum(album: Album) {
  const result = await send("album:item:post", album);
  return result;
}

export function onceUpdateAlbums(fn: () => void) {
  ipcRenderer.once("album:update", fn);
}

export function onceUpdateAlbum(id: number, fn: () => void) {
  ipcRenderer.once(`album:update:${id}`, fn);
}

export function onUpdateAlbum(id: number, fn: () => void) {
  ipcRenderer.on(`album:update:${id}`, fn);;
}
