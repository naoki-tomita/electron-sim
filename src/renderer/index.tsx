import { ipcRenderer } from "electron";
import * as React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";

import { AlbumList as AlbumListModel } from "./models/AlbumList";
import { AlbumList } from "./components/AlbumList";

class Headers extends React.Component {
  render() {
    return <div>Header</div>
  }
}

class Body extends React.Component {
  render() {
    return (
      <>
        <div>Body</div>
        <ImageView/>
      </>
    );
  }
}

class Footer extends React.Component {
  render() {
    return <div>Footer</div>
  }
}

class ImageView extends React.Component {
  render() {
    return <div>ImageView</div>
  }
}

class App extends React.Component {
  render() {
    const albumList = new AlbumListModel("/Volumes/Untitled/pics/");
    return (
      <>
        <Headers/>
        <AlbumList model={albumList}/>
        <Body/>
        <Footer/>
      </>
    );
  }
}

render(<App/>, document.getElementById("app"));
