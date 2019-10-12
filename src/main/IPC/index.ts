import { initialize as initAlbums } from "./Album";
import { initialize as initImages } from "./Image";

export function initialize() {
  initAlbums();
  initImages();
}
