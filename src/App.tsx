import "./App.css";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
            <AnimatePresence>
              <motion.div
                style={{ display: "flex", height: "100%", width: "100%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </DefaultLayout>
        </AntdApp>
      </ConfigProvider>
    </ChakraProvider>
  );
}
