import { readdir as _readdir, readFile as _readFile } from "fs";

export async function readdir(path: string): Promise<string[]> {
  return new Promise<string[]>((ok, ng) => {
    _readdir(path, (err, files) => {
      if (err) {
        return ng(err);
      }
      ok(files);
    })
  });
}

export async function readFile(path: string): Promise<Buffer> {
  return new Promise<Buffer>((ok, ng) => {
    _readFile(path, (err, data) => {
      if (err) {
        return ng(err);
      }
      ok(data);
    });
  });
}