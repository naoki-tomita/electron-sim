import { app, BrowserWindow, ipcMain } from "electron";
import { initialize } from "./Database";
import { createAlbumCache } from "./AlbumCache";

async function main() {
  initialize();
  await createAlbumCache("/Users/tomitanaoki/Desktop/albums/d");
  await createAlbumCache("/Users/tomitanaoki/Desktop/albums/a");
  await createAlbumCache("/Users/tomitanaoki/Desktop/albums/b");
}

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  window.loadFile("./index.html");
});

main();