import { ipcMain, IpcMainEvent } from "electron";
import { selectAll } from "../Database/Album";
import { Album } from "../../types/Types";

export function initialize() {
  ipcMain.on("albums:get", albums);
}

export async function albums(e: IpcMainEvent) {
  const albums = await selectAll();
  e.sender.send("albums:get", albums.map<Album>(({ id, name }) => ({ id, name })));
}
