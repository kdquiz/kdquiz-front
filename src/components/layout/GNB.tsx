import { Center, Flex, Text } from "@chakra-ui/react";

export default function GNB() {
  return (
    <>
      <Flex w={"100%"} h={"72px"} justify={"flex-end"}>
        <Center w={"20%"} bg={"subMain"}>
          <Text fontSize={"md"} color={"primary"}>
            회원가입
          </Text>
        </Center>
      </Flex>
    </>
  );
}
