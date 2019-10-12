import { broadcast } from ".";

export function dispatchUpdateAlbums() {
  broadcast("albums");
}

export function dispatchUpdateAlbum(id: number) {
  broadcast(`albums:${id}`);
  dispatchUpdateAlbums();
}
