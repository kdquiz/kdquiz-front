import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { Quiz } from "@/interface/Quiz.ts";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Button from "@/components/Button.tsx";

export default function QuizItem({ data }: { data: Quiz }) {
  return (
    <Center
      borderRightRadius={"16px"}
      borderBottomLeftRadius={"16px"}
      bg={"primary"}
      p={"0 16px 16px 0"}
      w={"100%"}
      boxShadow={["none", null, "-4px 4px 4px #646363"]}
      _groupHover={{
        boxShadow: "inset -2px 2px 2px #646363, 0px 0px 0px #646363",
      }}
      _groupActive={{
        boxShadow: "inset -5px 5px 2px #646363, 0px 0px 0px #646363",
      }}
      transition={"0.25s"}
    >
      <Flex
        h={["100px", null, "170px"]}
        bg={"white"}
        w="100%"
        transition={"0.25s"}
        role={"group"}
        gap={3}
      >
        <Image
          src={"/images/play-bg.png"}
          w={["100px", null, "300px"]}
          objectFit={"cover"}
        />
        <Flex w={"100%"} flexDir={["column", null, "row"]}>
          <Flex
            flexDir={"column"}
            justify={"space-between"}
            m={[1, null, 3]}
            w={"100%"}
          >
            <Text fontSize={["md", null, "xl", "3xl"]} color={"mainText"}>
              {data.title}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Center display={["none", null, "flex"]}>
                <FaUserCircle fontSize={"36px"} color={"#646363"} />
              </Center>
              <Center display={["flex", null, "none"]}>
                <FaUserCircle fontSize={"24px"} color={"#646363"} />
              </Center>
              <Text fontSize={["sm", null, "md", "2xl"]} color={"mainText"}>
                {localStorage.getItem("email")}
              </Text>
            </Flex>
          </Flex>
          <Flex
            m={[1, null, 3]}
            flexDir={["row", null, "column"]}
            w={["100%", null, "120px"]}
            justify={["flex-end", null, "space-between"]}
            alignItems={["center", null, "initial"]}
            gap={[2, null, 0]}
            pr={[5, null, 0]}
          >
            <Center justifyContent={"space-between"} gap={[2, null, 0]}>
              <Center display={["none", null, "flex"]}>
                <MdModeEditOutline fontSize={"48px"} color={"#646363"} />
              </Center>
              <Center display={["flex", null, "none"]}>
                <MdModeEditOutline fontSize={"36px"} color={"#646363"} />
              </Center>
              <Center display={["none", null, "flex"]}>
                <FaTrashAlt fontSize={"36px"} color={"#646363"} />
              </Center>
              <Center display={["flex", null, "none"]}>
                <FaTrashAlt fontSize={"24px"} color={"#646363"} />
              </Center>
            </Center>
            <Button
              color={"white"}
              fontSize={["md", null, "xl", null, "3xl"]}
              bg={"primary"}
              borderRadius={"6px"}
              w={["60px", null, "100px", null, "120px"]}
              h={["30px", null, "50px", null, "60px"]}
            >
              시작!
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}
