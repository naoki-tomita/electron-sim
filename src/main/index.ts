import { app, BrowserWindow, ipcMain } from "electron";

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    hasShadow: false,
  });
  window.loadFile("./index.html");
});
