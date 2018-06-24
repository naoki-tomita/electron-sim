const _imageThumbnail = require("image-thumbnail/src/index");

interface Options {
  percentage?: number;
  width?: number;
  height?: number;
}
interface BufferOptions extends Options {
  responseType?: "buffer";
}
interface Base64Options extends Options {
  responseType?: "base64";
}
interface ImageThumbnail {
  (path: string, options: BufferOptions): Promise<Buffer>;
  (path: string, options: Base64Options): Promise<string>;
}

export const imageThumbnail: ImageThumbnail = _imageThumbnail;
