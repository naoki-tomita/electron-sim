import { app, BrowserWindow, ipcMain } from "electron";
import { initialize as initIPC } from "./IPC/index";
import { initialize as initDB, index } from "./Database";

async function main() {
  initIPC();
  await initDB();
  // index("/Users/naoki.tomita/Desktop/album/柚希");
  index("/Users/naoki.tomita/Desktop/album/東京藝術大学 卒業展");
  // index("/Users/naoki.tomita/Desktop/album/韓国");
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
