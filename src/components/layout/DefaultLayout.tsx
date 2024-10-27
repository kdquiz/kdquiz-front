import { Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GNB />
      <Center
        w={"100%"}
        minH={"100%"}
        backgroundImage={"./images/main-bg.png"}
        backgroundPosition={"center"}
      >
        {children}
      </Center>
    </>
  );
}
