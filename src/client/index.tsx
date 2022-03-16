import * as React from "react";
import * as ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./Components/app";

ReactDOM.hydrate(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.getElementById("root")
);
