import { Text, Center } from "@chakra-ui/react";
import { Input } from "antd";

export default function PlayPage() {
  return (
    <Center
      h={"100%"}
      gap={"12px"}
      flexDir={"column"}
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
