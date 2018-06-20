import * as React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";

class Headers extends React.Component {
  render() {
    return <div>Header</div>
  }
}

class FolderList extends React.Component {
  render() {
    return <div>FolderList</div>;
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
    return (
      <>
        <Headers/>
        <FolderList/>
        <Body/>
        <Footer/>
      </>
    );
  }
}

render(<App/>, document.getElementById("app"));
