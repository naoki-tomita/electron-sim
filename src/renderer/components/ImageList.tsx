import styled from "styled-components";
import * as React from "react";

import { AlbumItem } from "../models/AlbumList";
import { ImageList , ImageItem } from "../models/ImageList";
import { extname } from "path";
import { getImageDataUrl } from "../../utils/File";

interface Props {
  size: number;
  model: ImageList;
}

export class ImageListComponent extends React.Component<Props> {
  componentDidMount() {
    this.props.model.onUpdate(() => {
      this.forceUpdate();
    });
  }

  render() {
    const { model } = this.props;
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
        {model.getList().map(i => this.renderImageItem(i))}
      </GridContainer>
    );
  }

  renderImageItem(item: ImageItem) {
    return (
      <img
        src={getImageDataUrl(
          extname(item.label),
          item.raw,
        )}
        width={this.props.size}
      />
    );
  }
}