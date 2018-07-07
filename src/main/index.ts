import { app, BrowserWindow, ipcMain } from "electron";
import { initialize } from "./Database";
import { createAlbumCache } from "./AlbumCache";

async function main() {
  initialize();
  await createAlbumCache("/Volumes/Untitled/pics/2013-12-22");
  await createAlbumCache("/Volumes/Untitled/pics/2014-12-07");
  await createAlbumCache("/Volumes/Untitled/pics/2014-12-29");
}

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  window.loadFile("./index.html");
});

main();