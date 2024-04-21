import { Flex, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDirection="column" h={"100%"}>
      <GNB />
      <Center
        mt={["36px", null, "72px"]}
        w={"100%"}
        h={"100%"}
        backgroundImage={"./images/main-bg.png"}
        backgroundPosition={"center"}
      >
        {children}
      </Center>
    </Flex>
  );
}
