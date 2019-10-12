import { ipcMain, BrowserWindow } from "electron";

export function broadcast(type: string) {
  BrowserWindow.getAllWindows().forEach(w => w.webContents.send(type));
}
