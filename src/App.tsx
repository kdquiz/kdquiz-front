import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "./pages/DefaultLayout.tsx";
import { Route, Routes } from "react-router-dom";
import theme from "./theme.ts";
import MainPage from "./pages/MainPage.tsx";
import AsdPage from "./pages/AsdPage.tsx";

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
