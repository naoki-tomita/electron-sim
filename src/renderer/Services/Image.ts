import { send } from "./IPC";
import { ipcRenderer } from "electron";

export async function getRawImage(id: number) {
  const result = await send<string>("image:raw", { id, });
  return result;
}

export function onceUpdateImage(id: number, fn: () => void) {
  ipcRenderer.once(`image:update:${id}`, fn);
}
