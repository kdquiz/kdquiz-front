import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfigProvider } from "antd";
import DefaultLayout from "@/components/layout/DefaultLayout.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#85AEFF",
              fontFamily: "TmoneyRoundWindExtraBold",
            },
          }}
        >
          <DefaultLayout>
            <App />
          </DefaultLayout>
        </ConfigProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
