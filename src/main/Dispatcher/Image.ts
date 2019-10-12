import { broadcast } from ".";

export function dispatchUpdateImages(albumId: number) {
  broadcast(`albums:${albumId}:images`);
}

export function dispatchUpdateImage(albumId: number, id: number) {
  broadcast(`albums:${albumId}:images:${id}`);
  dispatchUpdateImages(albumId);
}
