export type Albums = Album[];
export interface Album {
  id: number;
  name: string;
}

export type Images = Image[];
export interface Image {
  id: number;
  name: string;
  thumbnail: string;
}
