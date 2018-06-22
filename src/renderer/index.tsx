import { ipcRenderer } from "electron";
import * as React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";

import { AlbumList, AlbumItem } from "./models/AlbumList";
import { AlbumListComponent } from "./components/AlbumList";
import { Body } from "./components/Body";
import { ImageList } from "./models/ImageList";

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

interface State {
  selectedAlbum: AlbumItem;
}

class App extends React.Component<{}, State> {
  albumList: AlbumList;
  imageList: ImageList;
  constructor(p: {}, c: any) {
    super(p, c);
    this.albumList = new AlbumList("C:\\Users\\z00s000770\\Desktop\\folder");
    this.imageList = new ImageList();
    this.state = {} as any;
  }

  componentDidMount() {
    this.albumList.onUpdate(() => {
      console.log(this.albumList.selectedItem);
      this.imageList.setAlbum(this.albumList.selectedItem);
    });
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
        <AlbumListComponent model={this.albumList}/>
        <Body model={this.imageList} size={100}/>
        <Footer/>
      </GridComponent>
    );
  }
}

render(<App/>, document.getElementById("app"));
