import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "../components/layout/GNB";

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <Flex flexDirection="column">
    <GNB />
    <Center>{children}</Center>
  </Flex>
);

export default DefaultLayout;
