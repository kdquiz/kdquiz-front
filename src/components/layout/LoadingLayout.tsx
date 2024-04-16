import { ReactNode, useState } from "react";
import { Center, Image } from "@chakra-ui/react";

export default function LoadingLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  setTimeout(() => setLoading(true), 3000);
  return (
    <>
      <Center
        w={"100%"}
        h={!loading ? "100%" : 0}
        bg={"primary"}
        transition={"0.5s"}
        overflow={!loading ? "hidden" : "none"}
      >
        <Image src={"./images/icon.svg"} />
      </Center>
      <Center
        h={loading ? 0 : "100%"}
        overflow={loading ? "hidden" : "none"}
        display={loading ? "flex" : "none"}
      >
        {children}
      </Center>
    </>
  );
}
