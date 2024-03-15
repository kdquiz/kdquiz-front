import { Center, Image } from "@chakra-ui/react";
import Button from "../components/Button";
export default function Index() {
  return (
    <Center
      w={"100%"}
      backgroundImage={"/images/main-bg.png"}
      backgroundPosition={"center"}
      h={"760px"}
      flexDir={"column"}
      gap={"150px"}
    >
      <Image
        src={"/images/main-logo.svg"}
        w={"800px"}
        boxShadow={"-2px 2px 2px #646363"}
        objectFit={"cover"}
      />
      <Button
        w={"200px"}
        borderRadius={"8px"}
        bg={"primary"}
        color={"subText"}
        h={"100px"}
        fontSize={"5xl"}
        fontWeight={"700"}
        borderColor={"subMain"}
      >
        PLAY
      </Button>
    </Center>
  );
}
