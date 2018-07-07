import { ipcMain, Event } from "electron";
import { getAlbums, getAlbum, updateAlbum } from "../Database/Album";
import { getImages } from "../Database/Image";
import { Album } from "../../types/Album";

ipcMain.on("album:list", async (event: Event) => {
  const albums = await getAlbums();
  event.sender.send("album:list", albums);
});

ipcMain.on("album:image:list", async (event: Event, arg: { id: number }) => {
  const images = await getImages(arg.id);
  event.sender.send("album:image:list", images);
});

ipcMain.on("album:item:post", async (event: Event, arg: Album) => {
  updateAlbum(arg);
  event.sender.send("album:item:post");
});

export function dispatchUpdateAlbums() {
  ipcMain.emit("album:update");
}

export function dispatchUpdateAlbum(id: number) {
  ipcMain.emit(`album:update:${id}`);
}
