import { readdir as _readdir } from "fs";

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