import theme from "@/theme.ts";
import { ReactNode } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();
import { App as AntdApp } from "antd";

export default function Provider({ children }: { children: ReactNode }) {
  return (
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
            <AntdApp style={{ height: "100%" }}>{children}</AntdApp>
          </ConfigProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
