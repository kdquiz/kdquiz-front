import { Center, Image } from "@chakra-ui/react";

export default function Index() {
  return (
    <Center w={"100%"}>
      <Image
        src={"images/main-bg.png"}
        h={"100%"}
        w={"100%"}
        objectFit={"cover"}
      />
    </Center>
  );
}
