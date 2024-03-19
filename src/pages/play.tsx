import { Text, Center } from "@chakra-ui/react";
import { Input } from "antd";
import { useState } from "react";

export default function PlayPage() {
  const [splash, setSplach] = useState(false);
  setTimeout(() => setSplach(true), 5000);
  return (
    <Center
      h={splash ? "500px" : 0}
      gap={"12px"}
      flexDir={"column"}
      backgroundImage={"./images/main-bg.png"}
      backgroundPosition={"center"}
      w={"100%"}
    >
      <Text fontSize={"2xl"} color={"primary"} fontWeight={"700"}>
        PIN 입력
      </Text>
      <Input placeholder={"PIN"} />
    </Center>
  );
}
