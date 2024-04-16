import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";
// import LoadingLayout from "@/components/layout/LoadingLayout.tsx";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDirection="column" h={"100%"} transition={"0.25s"}>
      {/*<LoadingLayout>*/}
      <GNB />
      <Center
        mt={["36px", null, "72px"]}
        h={"100%"}
        backgroundImage={"./images/main-bg.png"}
        backgroundPosition={"center"}
      >
        {children}
      </Center>
      {/*</LoadingLayout>*/}
    </Flex>
  );
}
