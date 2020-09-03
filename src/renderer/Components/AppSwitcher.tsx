import React, { FC } from "react"
import { useContext } from "../Store";

export const AppSwitcher: FC = () => {
  const { switchApp } = useContext();
  return (
    <>
      <button onClick={() => switchApp("album")}>album</button>
      <button onClick={() => switchApp("album-select")}>album-select</button>
    </>
  );
}
