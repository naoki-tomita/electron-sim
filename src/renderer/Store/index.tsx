import React, { createContext, FC, useContext as useContextOriginal } from "react";
import { useAlbums, AlbumStore } from "./Album";

type Store = AlbumStore;

export const Context = createContext({} as any);

export const StoreProvider: FC = ({ children }) => {
  const album = useAlbums();
  return (
    <Context.Provider value={{ ...album }}>
      {children}
    </Context.Provider>
  );
};

export function useContext() {
  return useContextOriginal<Store>(Context);
}
