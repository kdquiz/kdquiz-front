import { MdOutlineTimer } from "react-icons/md";
import { Center, Text } from "@chakra-ui/react";

export function ScoreTimerPanel({
  seconds,
  score,
}: {
  seconds: number;
  score: number;
}) {
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
      <Text color={"white"} fontSize={"3xl"}>
        점수:{score}
      </Text>
      <MdOutlineTimer fontSize={"48px"} color={"white"} />
      <Text color={"white"} fontSize={"3xl"}>
        {seconds < 0 ? 0 : seconds}
      </Text>
    </Center>
  );
}
