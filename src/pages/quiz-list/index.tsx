import { Text, VStack } from "@chakra-ui/react";
import { QuizList } from "@/components/quizList/QuizList.tsx";

export default function QuizListPage() {
  return (
    <VStack
      alignItems="center"
      w={["100%", null, null, "80%", "60%"]}
      minH={"100dvh"}
      h={"100%"}
      mx={"auto"}
      boxShadow={["none", null, "0px 4px 12px #646363"]}
      bg={"white"}
      p={[5, null, 5]}
      pt={"50px"}
      justify={"space-between"}
    >
      <Text fontSize={["xl", null, "2xl", "4xl"]} color={"mainText"}>
        퀴즈 목록!
      </Text>
      <QuizList type={"play"} />
    </VStack>
  );
}
