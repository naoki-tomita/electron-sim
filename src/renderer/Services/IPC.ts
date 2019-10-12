import { ipcRenderer, Event } from "electron";
import { Album, Image } from "../../types/IPC";
import { Albums, Images } from "../../types/Types";

export async function send<T>(type: string, ...params: any[]) {
  return new Promise<T>(ok => {
    ipcRenderer.once(type, (_, args: T) => ok(args));
    ipcRenderer.send(type, ...params);
  });
}

export async function albums(): Promise<Albums> {
  const albumEntities = await send<Album[]>("albums:get");
  return albumEntities.map(({ id, name }) => ({ id, name }));
}

export async function images(albumId: number): Promise<Images> {
  const imageEntities = await send<Image[]>("images:get", albumId);
  return imageEntities.map(({ id, name, thumbnail }) => ({ id, name, thumbnail }));
}

export function onUpdateAlbums(fn: () => void) {
  ipcRenderer.on("albums", fn);
}
