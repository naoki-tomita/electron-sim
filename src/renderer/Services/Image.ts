import { send } from "./IPC";
import { ipcRenderer } from "electron";

export async function getRawImage(id: number) {
  return await send<string>("image:raw", { id, });
}

export function onceUpdateImage(id: number, fn: () => void) {
  ipcRenderer.once(`image:update:${id}`, fn);
}
