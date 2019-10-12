import { ipcMain, IpcMainEvent } from "electron";
import { selectByAlbumId } from "../Database/Image";

export function initialize() {
  ipcMain.on("images:get", images);
}

export async function images(e: IpcMainEvent, albumId: number) {
  const images = await selectByAlbumId(albumId);
  e.sender.send("images:get", images);
}
