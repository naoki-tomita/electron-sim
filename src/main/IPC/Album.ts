import { ipcMain, IpcMainEvent } from "electron";
import { selectAll } from "../Database/Album";
import { Album } from "../../types/Types";
import { index as indexAlbum } from "../Database"

export function initialize() {
  ipcMain.on("albums:get", albums);
  ipcMain.on("albums:post", index);
}

export async function albums(e: IpcMainEvent) {
  const albums = await selectAll();
  e.sender.send("albums:get", albums.map<Album>(({ id, name }) => ({ id, name })));
}

export async function index(e: IpcMainEvent, path: string) {
  indexAlbum(path);
}
