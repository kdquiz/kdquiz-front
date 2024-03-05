import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import DefaultLayout from "./pages/DefaultLayout";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultLayout>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </DefaultLayout>
    </ChakraProvider>
  );
}

export default App;
