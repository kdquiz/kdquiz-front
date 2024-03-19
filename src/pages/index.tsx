import { Center, Image, Link } from "@chakra-ui/react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const navigate = useNavigate();
  return (
    <Center
      w={"100%"}
      backgroundImage={"./images/main-bg.png"}
      backgroundPosition={"center"}
      h={"760px"}
      flexDir={"column"}
      gap={"150px"}
    >
      <Image
        src={"./images/main-logo.svg"}
        w={["300px", null, "800px"]}
        boxShadow={"-2px 2px 2px #646363"}
        objectFit={"cover"}
      />
      <Link href={"/play"}>
        <Button
          w={["100px", null, "200px"]}
          borderRadius={"8px"}
          bg={"primary"}
          color={"subText"}
          h={["50px", null, "100px"]}
          fontSize={["2xl", null, "5xl"]}
          fontWeight={"700"}
          borderColor={"subMain"}
          onClick={() => navigate("/play")}
        >
          PLAY
        </Button>
      </Link>
    </Center>
  );
}
