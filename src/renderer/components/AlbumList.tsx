import * as React from "react";
import styled from "styled-components";

import { AlbumList, AlbumItem } from "../models/AlbumList";

interface State {
  albums: AlbumItem[];
}

interface Props {
  model: AlbumList;
}

export class AlbumListComponent extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    const { model } = this.props;
    this.state = { albums: model.albums };
  }

  componentDidMount() {
    const { model } = this.props;
    model.onUpdate(() => {
      this.setState({
        albums: model.albums,
      });
    });
  }

  render() {
    const { albums } = this.state;
    const GridItem = styled.div`
      background-color: red;
      grid-area: album-list;
      overflow: auto;
    `;
    return (
      <GridItem>
        {albums.map(a => this.renderAlbumItem(a))}
      </GridItem>
    )
  }

  renderAlbumItem(album: AlbumItem) {
    const { selectedItem } = this.props.model;
    const isSelected = selectedItem &&
                       selectedItem.label === album.label &&
                       selectedItem.path === album.path;

    const FullWidthListItem = styled.div`
      width: 100%;
      background-color: ${isSelected ? "gray" : "inhelit"};
    `
    return (
      <FullWidthListItem key={album.label} onClick={() => this.onSelect(album)}>
        {album.label}
      </FullWidthListItem>
    );
  }

  onSelect = (item: AlbumItem) => {
    this.props.model.select(item);
  }
}