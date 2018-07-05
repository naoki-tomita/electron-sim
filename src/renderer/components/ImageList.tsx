import styled from "styled-components";
import * as React from "react";

import { extname } from "path";
import { getImageDataUrl } from "../../utils/File";
import { Image } from "../../types/Images";
import { getAlbumImages, onceUpdateAlbum } from "../Services/Album";

interface Props {
  size: number;
  id?: number;
}

interface State {
  images: Image[];
  prevId?: number;
}

export class ImageListComponent extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { images: [] };
  }

  handleUpdateAlbum = async () => {
    const { id } = this.props;
    const { prevId } = this.state;
    if (id === prevId) {
      return;
    }
    if (id != null) {
      const images = await getAlbumImages(id);
      this.setState({ images, prevId: id });
      onceUpdateAlbum(id, this.handleUpdateAlbum);
    }
  }

  render() {
    this.handleUpdateAlbum();
    const { images = [] } = this.state || {};
    const GridContainer = styled.div`
      display: grid;
      grid-auto-rows: ${this.props.size}px;
      grid-template-columns: repeat(auto-fill, ${this.props.size}px);
      overflow: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `;
    return (
      <GridContainer>
        {images.map(this.renderImageItem)}
      </GridContainer>
    );
  }

  renderImageItem = (item: Image) => {
    const { path, thumbnail } = item;
    const src = thumbnail
      ? getImageDataUrl(extname(path), thumbnail)
      : "http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif";
    return (
      <img
        src={src}
        width={this.props.size}
      />
    );
  }
}