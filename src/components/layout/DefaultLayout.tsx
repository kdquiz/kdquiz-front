import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDirection="column" h={"100%"}>
      <GNB />
      {children}
    </Flex>
  );
}
