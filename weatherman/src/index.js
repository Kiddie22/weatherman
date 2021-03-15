import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./components/app";

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
