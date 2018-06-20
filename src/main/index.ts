import { app, BrowserWindow } from "electron";

app.on("ready", () => {
  const window = new BrowserWindow({ width: 800, height: 600 });
  window.loadFile("./index.html");
});
