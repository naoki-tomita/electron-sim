import { ipcRenderer } from "electron";
import * as React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";

import { AlbumListComponent } from "./components/AlbumList";
import { Body } from "./components/Body";
import { onUpdateAlbum } from "./Services/Album";

const Header = styled.div`
  background-color: green;
  grid-area: header;
`;

const Footer = styled.div`
  background-color: blue;
  grid-area: footer;
`;

const Display = styled.div`
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

interface State {
  id: number;
}

class App extends React.Component<{}, State> {
  constructor(p: {}, c: any) {
    super(p, c);
    this.state = {} as any;
  }

  render() {
    const { id } = this.state;
    return (
      <Display>
        <Header/>
        <AlbumListComponent onChange={this.handleSelect}/>
        <Body id={id} size={256}/>
        <Footer/>
      </Display>
    );
  }

  handleSelect = (id: number) => {
    console.log("id changed", id);
    this.setState({ id, });
  }
}

async function main() {
  render(
    <App/>,
    document.getElementById("app"),
  );
}

main();