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
