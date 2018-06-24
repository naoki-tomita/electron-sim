import { AlbumCache } from "./src/main/AlbumCache";
import { all } from "./src/main/AlbumDatabase";

async function main() {
  const cache = new AlbumCache(256);
  await cache.init();
  await cache.addAlbum("/Volumes/Untitled/pics/JA-M-P!!2010");

  console.log(await all("SELECT * FROM album_list"));
  console.log(await all("SELECT * FROM image_list"));
}

main();
