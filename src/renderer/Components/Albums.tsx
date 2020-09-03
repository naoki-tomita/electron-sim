import React, { FC, useEffect } from "react";
import { useContext } from "../Store";

export const Albums: FC = () => {
  const { albums, selectAlbum, openAlbumSelector, currentAlbum } = useContext();

  return (
    <>
    <ul>
      {albums.map(it =>
        <li key={it.id} onClick={() => selectAlbum(it)}>
          {currentAlbum && it.id === currentAlbum.id ? <b>{it.name}</b> : it.name}
        </li>)}
    </ul>
    <button onClick={openAlbumSelector}>+</button>
    </>
  );
}
