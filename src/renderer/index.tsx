import * as React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";

injectGlobal`
  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
  }
  input, button, textarea, :focus {
      outline: none;
  }
`;

class App extends React.Component {
  render() {
    const Button = styled.button`
      background-color: #123;
      color: white;
      font: 3em sans-serif;
      box-shadow: 0px 5px 5px black;
      border-color: white;
      &:active {
        box-shadow: 0px 1px 1px black;
      }
    `;
    return <Button>Hello React World.</Button>;
  }
}

render(<App/>, document.getElementById("app"));
