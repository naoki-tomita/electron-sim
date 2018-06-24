import { imageThumbnail } from "../utils/image-thumbnail";

export async function createThumbnail(path: string, width: number) {
  return await imageThumbnail(path, {
    percentage: 100,
    width,
    responseType: "buffer",
  });
}