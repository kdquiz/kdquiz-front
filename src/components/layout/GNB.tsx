import { Center, Flex, Image, Link } from "@chakra-ui/react";
import Button from "../Button";

export default function GNB() {
  return (
    <Flex
      w={"100%"}
      h={["36px", null, "72px"]}
      justify={"space-between"}
      position={"absolute"}
      boxShadow={"-2px 2px 2px #646363"}
      bg={"white"}
      top={0}
    >
      <Link href={"/"}>
        <Image src={"./images/main-logo.svg"} h={"100%"} />
      </Link>
      <Center h={"100%"}>
        <Button
          w={["86px", null, "172px"]}
          bg={"subMain"}
          fontSize={["md", null, "2xl"]}
          color={"mainText"}
          fontWeight={"800"}
          h={"100%"}
          cursor={"pointer"}
        >
          회원가입
        </Button>
        <Button
          w={["86px", null, "172px"]}
          bg={"primary"}
          fontSize={["md", null, "2xl"]}
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
