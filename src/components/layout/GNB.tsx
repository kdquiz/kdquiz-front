import { Center, Flex, Image } from "@chakra-ui/react";
import Button from "../Button";

export default function GNB() {
  return (
    <Flex
      w={"100%"}
      h={"72px"}
      justify={"space-between"}
      borderBottom={"1px"}
      borderColor={"mainText"}
      position={"absolute"}
      bg={"white"}
    >
      <Image src={"/images/main-logo.svg"} h={"100%"} />
      <Center h={"100%"}>
        <Button
          w={"172px"}
          bg={"subMain"}
          fontSize={"2xl"}
          color={"mainText"}
          fontWeight={"800"}
          h={"100%"}
          cursor={"pointer"}
        >
          회원가입
        </Button>
        <Button
          w={"172px"}
          bg={"primary"}
          fontSize={"2xl"}
          color={"subText"}
          fontWeight={"700"}
          h={"100%"}
        >
          로그인
        </Button>
      </Center>
    </Flex>
  );
}
