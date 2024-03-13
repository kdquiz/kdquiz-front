import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import DefaultLayout from "./pages/DefaultLayout";
import MainPage from "./pages/MainPage";
import AsdPage from "./pages/AsdPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultLayout>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/asd"} element={<AsdPage />} />
        </Routes>
      </DefaultLayout>
    </ChakraProvider>
  );
}

export default App;
