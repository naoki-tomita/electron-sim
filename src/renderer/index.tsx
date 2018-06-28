import { ipcRenderer } from "electron";
import * as React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";

import { AlbumList, AlbumItem } from "./models/AlbumList";
import { AlbumListComponent } from "./components/AlbumList";
import { Body } from "./components/Body";
import { ImageList } from "./models/ImageList";
import { ImageListComponent } from "./components/ImageList";
import { AlbumCache } from "../main/AlbumCache";
import { all } from "../main/AlbumDatabase";

class Headers extends React.Component {
  render() {
    const GridItem = styled.div`
      background-color: green;
      grid-area: header;
    `;
    return <GridItem>Header</GridItem>
  }
}

class Footer extends React.Component {
  render() {
    const GridItem = styled.div`
      background-color: blue;
      grid-area: footer;
    `;
    return <GridItem>Footer</GridItem>
  }
}

interface Props {
  albumList: AlbumList;
  imageList: ImageList;
}

class App extends React.Component<Props> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = {} as any;
  }

  render() {
    const GridComponent = styled.div`
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-areas:
        'header header'
        'album-list body'
        'footer footer';
      grid-template-columns: 240px auto;
      grid-template-rows: 80px auto 80px;
    `;
    return (
      <GridComponent>
        <Headers/>
        <AlbumListComponent model={this.props.albumList}/>
        <Body model={this.props.imageList} size={256}/>
        <Footer/>
      </GridComponent>
    );
  }
}

async function main() {
  const cache = new AlbumCache(256);
  await cache.init();
  const albumList = new AlbumList("/Volumes/Untitled/pics", cache);
  const imageList = new ImageList(cache);

  albumList.onUpdate(() => {
    imageList.setAlbum(albumList.getSelectedAlbum());
  })

  render(
    <App albumList={albumList} imageList={imageList} />,
    document.getElementById("app"),
  );
}

main();