import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <Flex flexDirection="column" h={"100%"}>
    <GNB />
    <Center mt={["36px", null, "72px"]} h={"100%"}>
      {children}
    </Center>
  </Flex>
);

export default DefaultLayout;
