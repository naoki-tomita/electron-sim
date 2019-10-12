import { useState } from "react";
import { albums as fetchAlbums, images as fetchImages, onUpdateAlbums } from "../Services/IPC";
import { Albums, Album, Images } from "../../types/Types";

interface State {
  albums: Albums;
  currentAlbum: Album | null;
  images: Images;
}

interface Getters {
  albums: Albums;
  currentAlbum: Album | null;
  images: Images;
}

interface Actions {
  update(): void;
  selectAlbum(album: Album): void;
  init(): void;
}

export type AlbumStore = Getters & Actions

export function useAlbums(): AlbumStore {
  const x = useState<State>({
    albums: [],
    currentAlbum: null,
    images: [],
  });
  const [state, setState] = x;

  function init() {
    onUpdateAlbums(() => update());
  }

  async function update() {
    const { currentAlbum } = state;
    const albums = await fetchAlbums();
    const images = currentAlbum ? await fetchImages(currentAlbum.id) : [];
    setState({ ...state, albums, images });
  }

  function selectAlbum(currentAlbum: Album) {
    setState({ ...state, currentAlbum });
  }

  const { albums, currentAlbum, images } = state;
  return {
    albums,
    currentAlbum,
    images,
    update,
    selectAlbum,
    init,
  }
}
