import { ipcMain, IpcMainEvent } from "electron";
import { readdir, stat } from "../../utils/fs";
import { join } from "path";

export function initialize() {
  ipcMain.on("filesystem:dirs", dirs);
}

export async function dirs(e: IpcMainEvent, path: string) {
  if (path.startsWith("~")) {
    path = path.replace(/^~/, process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"] || "~");
  }
  const dirs = (await Promise.all((await readdir(path)).map(async f => {
    const status = await stat(join(path, f));
    return { f, dir: status.isDirectory(), hidden: f.startsWith(".") };
  }))).filter(it => it.dir && !it.hidden).map(it => it.f);

  e.sender.send("filesystem:dirs", { currentDir: path, dirs });
}
