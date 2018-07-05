import { ipcRenderer, Event } from "electron";

export async function send<T>(type: string, ...params: any[]) {
  return new Promise<T>(ok => {
    ipcRenderer.once(type, (event: Event, args: T) => {
      ok(args);
    });
    ipcRenderer.send(type, ...params);
  });
}