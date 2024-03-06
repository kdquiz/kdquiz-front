import { Center } from "@chakra-ui/react";
import Button from "../components/Button";

export default function Index() {
  return (
    <Center
      w={"100%"}
      backgroundImage={"images/main-bg.png"}
      backgroundPosition={"center"}
      mt={"72px"}
      h={"500px"}
    >
      <Button
        w={"200px"}
        borderRadius={"28px"}
        bg={"primary"}
        color={"subText"}
        h={"100px"}
        fontSize={"2xl"}
        fontWeight={"700"}
        borderColor={"subMain"}
      >
        응아아아악
      </Button>
    </Center>
  );
}
