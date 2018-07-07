import { ipcRenderer } from "electron";
import { Album } from "../../types/Album";
import { send } from "./IPC";
import { Image } from "../../types/Images";

export async function getAlbums() {
  return await send<Album[]>("album:list");
}

export async function getAlbumImages(id: number) {
  return await send<Image[]>("album:image:list", { id, });
}

export async function postAlbum(album: Album) {
  return await send("album:item:post", album);
}

export function onceUpdateAlbums(fn: () => void) {
  ipcRenderer.once("album:update", fn);
}

export function onceUpdateAlbum(id: number, fn: () => void) {
  ipcRenderer.once(`album:update:${id}`, fn);
}

export function onUpdateAlbum(id: number, fn: () => void) {
  ipcRenderer.on(`album:update:${id}`, fn);
  console.log(ipcRenderer.eventNames());
  console.log(ipcRenderer.listenerCount(`album:update:${id}`));
}
