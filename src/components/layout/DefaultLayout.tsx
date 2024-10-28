import { Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import GNB from "./GNB.tsx";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const withGnb = ["/play", "/participation"].includes(
    window.location.pathname,
  );
  return (
    <>
      {!withGnb && <GNB />}
      <Center
        w={"100%"}
        minH={"100%"}
        backgroundImage={
          !withGnb ? "/images/main-bg.webp" : "/images/game-bg.webp"
        }
        backgroundPosition={"center"}
        backgroundSize={"cover"}
      >
        {children}
      </Center>
    </>
  );
}
