import { Center, Text } from "@chakra-ui/react";

export function Score({ score }: { score: number }) {
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
    >
      <Text color={"white"} fontSize={"3xl"}>
        점수:{score}
      </Text>
    </Center>
  );
}
