import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <Flex flexDirection="column">
    <GNB />
    <Center mt={"72px"}>{children}</Center>
  </Flex>
);

export default DefaultLayout;
