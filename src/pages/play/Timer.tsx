import { MdOutlineTimer } from "react-icons/md";
import { Center, Text } from "@chakra-ui/react";

export function Timer({ seconds }: { seconds: string }) {
  return (
    <Center
      fontSize={["md", null, "xl"]}
      borderRadius={"12px"}
      bg={"primary"}
      border={"2px"}
      borderColor={"primary"}
      boxShadow={"2px 2px 2px #646363"}
      p={2}
      gap={2}
      position={"absolute"}
      top={"6px"}
      left={"6px"}
    >
      <MdOutlineTimer fontSize={"48px"} color={"white"} />
      <Text color={"white"} fontSize={"3xl"}>
        {seconds}
      </Text>
    </Center>
  );
}
