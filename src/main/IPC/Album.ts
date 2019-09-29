import { ipcMain, Event, app, BrowserWindow } from "electron";
import { getAlbums, getAlbum, updateAlbum } from "../Database/Album";
import { getImages } from "../Database/Image";
import { Album } from "../../types/Album";

ipcMain.on("album:list", async event => {
  const albums = await getAlbums();
  event.sender.send("album:list", albums);
});

ipcMain.on("album:image:list", async (event, arg: { id: number }) => {
  const images = await getImages(arg.id);
  event.sender.send("album:image:list", images);
});

ipcMain.on("album:item:post", async (event, arg: Album) => {
  updateAlbum(arg);
  event.sender.send("album:item:post");
});

export function dispatchUpdateAlbums() {
  BrowserWindow.getAllWindows().forEach(w => w.webContents.send(`album:update`));
}

export function dispatchUpdateAlbum(id: number) {
  BrowserWindow.getAllWindows().forEach(w => w.webContents.send(`album:update:${id}`));
}
