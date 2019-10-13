import { initialize as initAlbums } from "./Album";
import { initialize as initImages } from "./Image";
import { initialize as initFileSystems } from "./FileSystem";

export function initialize() {
  initAlbums();
  initImages();
  initFileSystems();
}
