import { remote } from "electron";
import * as React from "react";
import styled from "styled-components";
import { Album } from "../../types/Album";
import { postAlbum } from "../Services/Album";

const { Menu, MenuItem } = remote;

interface Props {
  isSelected: boolean;
  album: Album;
  onClick: () => void;
}

interface State {
  isRenaming: boolean;
  name: string;
}

const FullWidthListItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  background-color: ${props => props.isSelected ? "gray" : "inherit"};
`

const RenameInput = styled.input<{ isSelected: boolean }>`
  width: 100%;
  background-color: ${(props: any) => props.isSelected ? "gray" : "inherit"};
`;

export class AlbumItem extends React.Component<Props, State> {
  readonly menu = new Menu();
  constructor(p: Props, c: any) {
    super(p, c)
    const name = p.album.name || p.album.path.substring(p.album.path.lastIndexOf("/") + 1);
    this.state = {
      isRenaming: false,
      name,
    }
  }

  componentDidMount() {
    this.menu.append(new MenuItem({
      label: "Rename",
      click: this.handleRename,
    }));
  }

  render() {
    const { isRenaming = false } = this.state || {};

    if (isRenaming) {
      return this.renderRenamingItem();
    }
    return this.renderListItem();
  }

  renderRenamingItem() {
    const { isSelected, album } = this.props;
    const { name = album.name } = this.state || {};
    return (
      <RenameInput
        value={name}
        isSelected={isSelected}
        onChange={this.handleNameChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }

  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.keyCode === 13) {
      this.setState({
        isRenaming: false,
      });
      const { album } = this.props;
      const { name } = this.state;
      postAlbum({
        ...album,
        name,
      });
    }
  }

  handleNameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      name: e.target.value,
    });
  }

  renderListItem() {
    const { isSelected, onClick } = this.props;
    const { name } = this.state;
    return (
      <FullWidthListItem
        onContextMenu={this.handleRightClick}
        isSelected={isSelected}
        onClick={onClick}
      >
        {name}
      </FullWidthListItem>
    );
  }

  handleRightClick = () => {
    this.menu.popup({});
  }

  handleRename = () => {
    this.setState({
      isRenaming: true,
    });
  }
}
