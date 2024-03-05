import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: "#9981DB",
    subMain: "#FAEC71",
    mainText: "#646363",
    subText: "#FFFFFF",
    buttonBg1: "#F9F9CD",
    buttonBg2: "#FADACF",
    buttonBg3: "#CFFADE",
    buttonBg4: "#ECCDF9",
  },
});

export default theme;
