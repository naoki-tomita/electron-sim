import styled from "styled-components";
import * as React from "react";
import { ImageListComponent } from "./ImageList";

interface Props {
  id: number;
  size: number;
}

export class Body extends React.Component<Props> {
  render() {
    const GridItem = styled.div`
      background-color: gray;
      grid-area: body;
      position: relative;
    `;
    const display = false;
    const { size, id } = this.props;
    return (
      <GridItem>
        <ImageListComponent size={size} id={id}/>
        <ImageView display={display}/>
      </GridItem>
    );
  }
}

interface IVProps {
  display: boolean;
}

class ImageView extends React.Component<IVProps> {
  render() {
    const { display } = this.props;
    const ImageContainer = styled.span`
      background-color: gray;
      grid-area: body;
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: ${display ? "inline-block" : "none"};
    `;
    const Backdrop = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: ${display ? "block" : "none"};
    `;
    return (
      <>
        <Backdrop/>
        <ImageContainer>ImageView</ImageContainer>
      </>
    );
  }
}
