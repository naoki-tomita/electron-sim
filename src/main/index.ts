import { app, BrowserWindow, ipcMain } from "electron";
import { initialize as initIPC } from "./IPC/index";
import { initialize as initDB, index } from "./Database";

async function main() {
  initIPC();
  await initDB();
  index("/Users/naoki.tomita/Desktop/album/dogs");
  index("/Users/naoki.tomita/Desktop/album/cats");
  index("/Users/naoki.tomita/Desktop/album/images");
}

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  window.loadFile("./index.html");
});

main();
