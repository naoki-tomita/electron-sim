import { readFile } from "fs";
import sharp from "sharp";

async function readFileAsync(path: string): Promise<Buffer> {
  return new Promise<Buffer>(ok => readFile(path, (_, data) => ok(data)))
}

export async function createThumbnail(path: string, width: number) {
  const fileContent = await readFileAsync(path);
  return sharp(fileContent).resize(width).toBuffer();
}
