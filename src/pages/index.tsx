import { Center, Image, Link, Text, VStack } from "@chakra-ui/react";
import Button from "../components/Button.tsx";
import { useReducer } from "react";
import { QRCode } from "antd";
export default function Index() {
  const [qrOpen, setQrOpen] = useReducer((prev) => !prev, false);

  return (
    <VStack w={"100%"} gap={qrOpen ? "100px" : "150px"} transition={".5s"}>
      <VStack gap={5}>
        <Image
          src={"./images/main-logo.svg"}
          w={["300px", "500px", "800px"]}
          boxShadow={"2px 2px 2px #646363"}
          backgroundSize={"cover"}
          borderRadius={["6px", null, "12px"]}
          onClick={setQrOpen}
        />
        <Center
          bg={"white"}
          borderRadius={"12px"}
          maxH={qrOpen ? "500px" : "0px"}
          overflow={"hidden"}
          transition={".5s"}
        >
          <QRCode value={window.location.href} />
        </Center>
      </VStack>
      <Link href={"/quiz-list"} style={{ textDecoration: "none" }}>
        <Button
          w={["100px", "150px", "200px"]}
          borderRadius={"12px"}
          bg={"primary"}
          color={"subText"}
          h={["50px", "74px", "100px"]}
          fontSize={["2xl", "3xl", "5xl"]}
          fontWeight={"700"}
        >
          <Text>PLAY</Text>
        </Button>
      </Link>
    </VStack>
  );
}
