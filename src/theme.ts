import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: "#85AEFF",
    subMain: "#FAEC71",
    mainText: "#646363",
    subText: "#FFFFFF",
    buttonBg1: "#FFE81D",
    buttonBg2: "#AA76FF",
    buttonBg3: "#FF5656",
    buttonBg4: "#63CF61",
    error: "#FF6363",
    select: "#DBDBDB",
  },
  fonts: {
    heading: "TmoneyRoundWindExtraBold",
    body: "TmoneyRoundWindExtraBold",
  },
});

export default theme;
