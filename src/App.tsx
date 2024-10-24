import "./App.css";
import { Outlet } from "react-router-dom";
import DefaultLayout from "@/components/layout/DefaultLayout.tsx";
import theme from "@/theme.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { App as AntdApp, ConfigProvider } from "antd";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#85AEFF",
            fontFamily: "TmoneyRoundWindExtraBold",
          },
        }}
      >
        <AntdApp style={{ height: "100%" }}>
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        </AntdApp>
      </ConfigProvider>
    </ChakraProvider>
  );
}
