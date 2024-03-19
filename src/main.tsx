import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme.ts";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "./components/layout/DefaultLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </ChakraProvider>
  </React.StrictMode>,
);
