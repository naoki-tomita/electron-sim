import React, { useEffect } from "react";
import { render } from "react-dom";
import { StoreProvider, useContext } from "./Store";

const InnerApp = () => {
  const { albums, images, currentAlbum, initUpdateHandle, removeUpdateHandle, update, selectAlbum, openAlbumSelector } = useContext();
  useEffect(() => (initUpdateHandle(), removeUpdateHandle), [])
  useEffect(() => { update() }, [currentAlbum]);
  return (
    <>
      <h1>app</h1>
      <ul>
        {albums.map(it => <li key={it.id} onClick={() => selectAlbum(it)}>{currentAlbum && it.id === currentAlbum.id ? <b>{it.name}</b> : it.name}</li>)}
      </ul>
      <button onClick={openAlbumSelector}>+</button>
      <hr />
      <ul>
        {images.map(it => <li key={it.id}><img src={`data:image/png;base64,${it.thumbnail}`} /></li>)}
      </ul>
    </>
  );
}

const App = () => {
  return (<StoreProvider><InnerApp /></StoreProvider>);
};

render(<App />, document.getElementById("app"));
