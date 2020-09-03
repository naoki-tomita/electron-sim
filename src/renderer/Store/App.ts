import { openAlbumSelector } from "../Services/IPC";
import { useState } from "react";

type Apps = "album" | "album-select";

interface State {
  currentApp: Apps;
}

interface Getters {
}

interface Actions {
  openAlbumSelector(): void;
  switchApp(currentApp: Apps): void;
}

export type AppStore = Getters & Actions

export function useApp(): AppStore {
  const [state, setState] = useState<State>({ currentApp: "album" });

  function switchApp(currentApp: Apps) {
    setState({ ...state, currentApp });
  }

  return {
    openAlbumSelector,
    switchApp
  }
}
