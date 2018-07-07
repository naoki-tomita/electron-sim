import * as React from "react";
import styled from "styled-components";

import { onceUpdateAlbums, getAlbums } from "../Services/Album";
import { Album } from "../../types/Album";
import { AlbumItem } from "./AlbumItem";

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
    const isSelected = !!selectedItem &&
                       selectedItem.path === album.path;
    return (
      <AlbumItem
        key={album.path}
        onClick={() => this.onSelect(album)}
        isSelected={isSelected}
        album={album}
      />
    );
  }

  onSelect = (selectedItem: Album) => {
    const { selectedItem: oldItem } = this.state;
    if (!oldItem || oldItem.id !== selectedItem.id) {
      this.setState({
        selectedItem,
      });
      const { onChange } = this.props;
      onChange(selectedItem.id);
    }
  }
}