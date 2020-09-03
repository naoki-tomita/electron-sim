import React, { FC } from "react";

import { useContext } from "../Store";

export const Images: FC = () => {
  const { images } = useContext();
  return (
    <ul>
      {images.map(it =>
        <li key={it.id}>
          <img src={`data:image/png;base64,${it.thumbnail}`} />
        </li>)}
    </ul>
  );
}
