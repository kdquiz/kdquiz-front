import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import DefaultLayout from "./pages/DefaultLayout";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultLayout>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
        </Routes>
      </DefaultLayout>
    </ChakraProvider>
  );
}

export default App;
