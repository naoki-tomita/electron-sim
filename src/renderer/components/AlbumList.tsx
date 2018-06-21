import * as React from "react";
import styled from "styled-components";

import { AlbumList as AlbumListModel, AlbumItem } from "../models/AlbumList";

interface State {
  albums: AlbumItem[];
}

interface Props {
  model: AlbumListModel;
}

export class AlbumList extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    const { model } = this.props;
    this.state = { albums: model.albums };
    model.onUpdate(() => {
      this.setState({
        albums: model.albums,
      });
    });
  }
  render() {
    console.log("render");
    const { albums } = this.state;
    return (
      <ul>
        {albums.map(a => this.renderAlbumItem(a))}
      </ul>
    )
  }

  renderAlbumItem(album: AlbumItem) {
    return (
      <li key={album.label}>{album.label}</li>
    );
  }
}