import { initialize } from "./src/main/Database";
import { addAlbum } from "./src/main/Database/Album";

async function main() {
  await initialize();
  await addAlbum("/hoge/fuga1");
  await addAlbum("/hoge/fuga2", "name2");
}

main();