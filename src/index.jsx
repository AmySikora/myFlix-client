import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";


const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

const container = document.querySelector("#root");
if (!container.hasChildNodes()) {
  const root = createRoot(container);
  root.render(<MyFlixApplication />);
}