import React, { FC, useEffect } from "react";
import { useContext, StoreProvider } from "./Store";
import { render } from "react-dom";
import { join } from "path";

const InnerApp: FC = () => {
  const { dirs, currentDir, updateDirs, digDir, parentDir, indexAlbum } = useContext();
  useEffect(() => { updateDirs() }, [currentDir])
  return (
    <>
    {currentDir.split("/")
      .filter(Boolean)
      .reduce<Array<{ name: string, path: string }>>((prev, cur, i) => [ ...prev, { name: cur, path: join((prev[i - 1] || {}).path || "/", cur)}], [])
      .map(it => <span>> <a href="#" onClick={() => digDir(it.path)}>{it.name}</a> </span>)}
    <div><button onClick={() => indexAlbum(currentDir)}>select</button></div>
    <ul>
      <li onClick={parentDir}><a href="#">↑</a></li>
      {dirs.map(it => <li onClick={() => digDir(join(currentDir, it))}><a href="#">{it}</a></li>)}
    </ul>
    </>
  );
}

const App = () => {
  return (<StoreProvider><InnerApp /></StoreProvider>);
};

render(<App />, document.getElementById("app"));
