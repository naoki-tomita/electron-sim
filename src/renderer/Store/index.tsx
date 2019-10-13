import React, { createContext, FC, useContext as useContextOriginal } from "react";
import { useAlbums, AlbumStore } from "./Album";
import { useFileSystem, FileSystemStore } from "./FileSystem";
import { AppStore, useApp } from "./App";

type Store = AppStore & AlbumStore & FileSystemStore;

export const Context = createContext({} as any);

export const StoreProvider: FC = ({ children }) => {
  const album = useAlbums();
  const filesystem = useFileSystem();
  const appStore = useApp();
  return (
    <Context.Provider value={{ ...album, ...filesystem, ...appStore }}>
      {children}
    </Context.Provider>
  );
};

export function useContext() {
  return useContextOriginal<Store>(Context);
}
