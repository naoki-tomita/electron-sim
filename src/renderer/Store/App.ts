import { openAlbumSelector } from "../Services/IPC";

interface Getters {
}

interface Actions {
  openAlbumSelector(): void;
}

export type AppStore = Getters & Actions

export function useApp(): AppStore {
  return {
    openAlbumSelector,
  }
}
