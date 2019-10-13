declare module "exif-reader" {
  export interface Exif {
    image: {
      Make: string;
      Model: string;
      XResolution: number;
      YResolution: number;
      Orientation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      ResolutionUnit: number;
      Software: string;
      ModifyDate: string;
      ExifOffset: number;
    };
    thumbnail: {
      Compression: number;
      XResolution: number;
      YResolution: number;
      ResolutionUnit: number;
      ThumbnailOffset: number;
      ThumbnailLength: number;
    };
    exif: {
      ExposureTime: number;
      FNumber: number;
      ExposureProgram: number;
      ISO: number;
      ExifVersion: Buffer;
      DateTimeOriginal: string,
      DateTimeDigitized: string,
      ShutterSpeedValue: number,
      ApertureValue: number,
      ExposureBiasValue: number,
      MaxApertureValue: number,
      MeteringMode: number,
      Flash: number,
      FocalLength: number,
      SubSecTimeOriginal: string,
      SubSecTimeDigitized: string,
      ColorSpace: number,
      FocalPlaneXResolution: number,
      FocalPlaneYResolution: number,
      FocalPlaneResolutionUnit: number,
      CustomRendered: number,
      ExposureMode: number,
      WhiteBalance: number,
      SceneCaptureType: number,
      BodySerialNumber: string,
      LensSpecification: [ number, number, number, number ],
      LensModel: string;
    }
  }

  function exif(metadata: Buffer): Exif;
  export default exif;
}
