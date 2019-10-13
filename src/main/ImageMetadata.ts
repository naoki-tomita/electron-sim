import sharp from "sharp";
import exif, { Exif } from "exif-reader";

export async function createThumbnail(path: string, width: number) {
  const exif = await createExif(path);
  return sharp(path).resize(width).rotate(getRotateAngle(exif)).toBuffer();
}

function getRotateAngle(exif: Exif | null) {
  if (!exif) {
    return 0;
  }
  switch (exif.image.Orientation) {
    case 3:
      return 180;
    case 6:
      return 90;
    case 8:
      return 270;
    default:
      return 0;
  }
}

export async function createExif(path: string) {
  const metadata = await sharp(path).metadata();
  return metadata.exif ? exif(metadata.exif) : null;
}
