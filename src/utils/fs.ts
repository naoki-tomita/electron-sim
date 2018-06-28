import { readdir as _readdir, readFile as _readFile, stat as _stat, Stats } from "fs";

export async function readdir(path: string): Promise<string[]> {
  return new Promise<string[]>((ok, ng) => {
    _readdir(path, (err, files) => {
      if (err) ng(err);
      else ok(files);
    })
  });
}

export async function readFile(path: string): Promise<Buffer> {
  return new Promise<Buffer>((ok, ng) => {
    _readFile(path, (err, data) => {
      if (err) ng(err);
      else ok(data);
    });
  });
}

export async function stat(path: string) {
  return new Promise<Stats>((ok, ng) => {
    _stat(path, (err, status) => {
      if (err) ng(err);
      else ok(status);
    });
  });
}