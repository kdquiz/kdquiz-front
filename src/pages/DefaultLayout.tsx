import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "../components/layout/GNB";

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <Flex flexDirection="column" h={"100%"}>
    <GNB />
    <Center h={"100%"}>{children}</Center>
  </Flex>
);

export default DefaultLayout;
