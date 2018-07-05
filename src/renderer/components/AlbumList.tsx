import * as React from "react";
import styled from "styled-components";

import { onceUpdateAlbums, getAlbums } from "../Services/Album";
import { Album } from "../../types/Album";

interface Props {
  onChange: (id: number) => void;
}

interface State {
  albums: Album[];
  selectedItem: Album | null;
}

const GridItem = styled.div`
  background-color: red;
  grid-area: album-list;
  overflow: auto;
`;

export class AlbumListComponent extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { albums: [], selectedItem: null };
  }

  componentDidMount() {
    this.handleUpdateAlbums();
  }

  handleUpdateAlbums = async () => {
    const albums = await getAlbums();
    const { selectedItem = null } = this.state || {};
    this.setState({ albums, });
    this.onSelect(selectedItem || albums[0]);
    onceUpdateAlbums(this.handleUpdateAlbums);
  }

  render() {
    const { albums } = this.state;
    return (
      <GridItem>
        {albums.map(a => this.renderAlbumItem(a))}
      </GridItem>
    )
  }

  renderAlbumItem(album: Album) {
    const { selectedItem = null } = this.state || {};
    const isSelected = selectedItem &&
                       selectedItem.path === album.path;

    const FullWidthListItem = styled.div`
      width: 100%;
      background-color: ${isSelected ? "gray" : "inhelit"};
    `
    return (
      <FullWidthListItem key={album.path} onClick={() => this.onSelect(album)}>
        {album.name || album.path}
      </FullWidthListItem>
    );
  }

  onSelect = (selectedItem: Album) => {
    this.setState({
      selectedItem,
    });
    const { onChange } = this.props;
    onChange(selectedItem.id);
  }
}