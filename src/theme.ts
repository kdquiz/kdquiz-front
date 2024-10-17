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
    buttonBg1: "#85AEFF",
    buttonBg2: "#FFBAF0",
    buttonBg3: "#FFE81D",
    buttonBg4: "#AA76FF",
    buttonBg5: "#FF5656",
    buttonBg6: "#63CF61",
    buttonBg7: "#FFD494",
    buttonBg8: "#5AFFD7",
    error: "#FF6363",
    select: "#DBDBDB",
    gray: "#333333",
  },
  fonts: {
    heading: "TmoneyRoundWindExtraBold",
    body: "TmoneyRoundWindExtraBold",
  },
});

export default theme;
