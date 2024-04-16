import { Center, Image, Link, Text } from "@chakra-ui/react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const navigate = useNavigate();

  return (
    <Center w={"100%"} flexDir={"column"} gap={"150px"}>
      <Image
        src={"./images/main-logo.svg"}
        w={["300px", null, "800px"]}
        boxShadow={"-2px 2px 2px #646363"}
        backgroundSize={"cover"}
        borderRadius={"12px"}
      />
      <Link href={"/play"} style={{ textDecoration: "none" }}>
        <Button
          w={["100px", null, "200px"]}
          borderRadius={"12px"}
          bg={"primary"}
          color={"subText"}
          h={["50px", null, "100px"]}
          fontSize={["2xl", null, "5xl"]}
          fontWeight={"700"}
          onClick={() => navigate("/play")}
        >
          <Text>PLAY</Text>
        </Button>
      </Link>
    </Center>
  );
}
