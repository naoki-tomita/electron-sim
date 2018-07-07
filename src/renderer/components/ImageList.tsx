import styled from "styled-components";
import * as React from "react";

import { extname } from "path";
import { getImageDataUrl } from "../../utils/File";
import { Image } from "../../types/Images";
import { getAlbumImages, onceUpdateAlbum, onUpdateAlbum } from "../Services/Album";

interface Props {
  size: number;
  id?: number;
}

interface State {
  images: Image[];
  prevId?: number;
}

interface GridProps {
  size: number;
}

// grid-auto-rows: ${props => props.size}px;
const GridContainer = styled<GridProps, "div">("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${props => props.size}px);
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;


class ImageComponent extends React.Component<{
  src: string;
  width: number;
}> {
  render() {
    return <img src={this.props.src} width={this.props.width} />
  }
}


export class ImageListComponent extends React.Component<Props, State> {
  ids: number[] = [];
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { images: [] };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log(nextProps, this.props);
    // when id changed.
    if (nextProps.id !== this.props.id) {
      return true;
    }

    // when image updated.
    if (this.state.images.length !== nextState.images.length) {
      return true;
    }
    if (
      this.state.images.length !== 0 &&
      this.state.images[0].id !== nextState.images[0].id
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    const { id } = this.props;
    if (id != null && !this.ids.includes(id)) {
      console.log("new id", id);
      this.ids.push(id);
      onUpdateAlbum(id, () => this.handleUpdateAlbum(id));
    } if (id != null) {
      console.log("already known id", id);
      this.loadAlbum(id)
    }
  }

  handleUpdateAlbum = async (id: number | undefined) => {
    const { id: curId } = this.props;
    if (id == null) {
      return;
    }
    if (curId === id) {
      this.loadAlbum(id);
    }
  }

  loadAlbum = async (id: number) => {
    const images = await getAlbumImages(id);
    this.setState({ images });
  }

  render() {
    const { images = [] } = this.state || {};
    return (
      <GridContainer size={this.props.size}>
        {images.filter(i => !!i.thumbnail).map(this.renderImageItem)}
      </GridContainer>
    );
  }

  renderImageItem = (item: Image) => {
    const { path, thumbnail } = item;
    if (!thumbnail) {
      return null;
    }
    return (
      <ImageComponent
        key={item.id}
        src={getImageDataUrl(extname(item.path), thumbnail)}
        width={this.props.size}
      />
    );
  }
}
