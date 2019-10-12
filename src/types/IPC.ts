export interface Album {
  id: number;
  name: string;
  path: string;
}

export interface Image {
  id: number;
  albumNumber: number;
  name: string;
  path: string;
  thumbnail: string;
}
