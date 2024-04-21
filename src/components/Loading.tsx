import { Center, Text } from "@chakra-ui/react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <Center>
      <Center flexDir={"column"} gap={3} p={4}>
        <Spin size={"large"} />
        <Text fontSize={"3xl"} color={"primary"}>
          로딩 중...
        </Text>
      </Center>
    </Center>
  );
}
