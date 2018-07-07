import { ipcMain, Event, BrowserWindow } from "electron";
import { readFile } from "../../utils/fs";
import { getImage } from "../Database/Image";

ipcMain.on("image:raw", async (event: Event, arg: { id: number }) => {
  const image = await getImage(arg.id);
  const rawImage = await readFile(image.path);
  event.sender.send("image:raw", rawImage.toString("base64"));
});

export function dispatchUpdateImage(id: number) {
  BrowserWindow.getAllWindows().forEach(w => w.webContents.send(`image:update:${id}`));
}
