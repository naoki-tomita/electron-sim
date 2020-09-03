import React, { useEffect } from "react";
import { render } from "react-dom";
import { StoreProvider } from "./Store";
import { AppSwitcher } from "./Components/AppSwitcher";
import { Albums } from "./Components/Albums";
import { Images } from "./Components/Images";

const InnerApp = () => {
  return (
    <>
      <h1>app</h1>
      <AppSwitcher />
      <Albums />
      <hr />
      <Images />
    </>
  );
}

const App = () => {
  return (<StoreProvider><InnerApp /></StoreProvider>);
};

render(<App />, document.getElementById("app"));
