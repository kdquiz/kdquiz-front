import { Center, Flex, Text } from "@chakra-ui/react";
import { QuizList } from "@/components/quizList/QuizList.tsx";

export default function MyPage() {
  return (
    <Center w={"100%"} h={"100%"}>
      <Center
        w={["100%", null, null, "80%", "60%"]}
        h={"100%"}
        boxShadow={["none", null, "0px 4px 12px #646363"]}
      >
        <Flex
          w={"100%"}
          h={"100%"}
          bg={"white"}
          p={[2, null, 5]}
          flexDir={"column"}
          gap={[2, null, 5]}
        >
          <Text fontSize={["xl", null, "2xl", "4xl"]} color={"mainText"}>
            프로젝트 라이브러리
          </Text>
          <QuizList />
        </Flex>
      </Center>
    </Center>
  );
}
