import { Center, Flex, Text } from "@chakra-ui/react";
import { QuestionDeleteButton } from "@/pages/quiz/QuestionListPanel/QuestionDeleteButton.tsx";
import { useSearchParams } from "react-router-dom";
import { Question } from "@/interface/Question.ts";

export function QuestionItem({
  id,
  content,
  index,
  quizList,
}: {
  id: number;
  content: string;
  index: number;
  quizList: Question[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentId = Number(searchParams.get("id")) ?? 0;
  return (
    <Center flexDir={"column"} w={"100%"} p={4} gap={1} key={index}>
      <Text fontSize={"xl"} color={"mainText"} w={"100%"}>
        {index + 1}.
      </Text>
      <Flex w={"100%"} gap={2}>
        <Center
          onClick={() => {
            searchParams.set("id", String(id));
            setSearchParams(searchParams);
          }}
          cursor={"pointer"}
          w={"200px"}
          h={"150px"}
          borderRadius={"6px"}
          bg={"select"}
          bgImage={"/images/play-bg.png"}
          bgSize={"cover"}
          overflow={"hidden"}
          border={"4px"}
          transition={"0.25s"}
          _hover={{
            borderColor: Number(currentId) !== id && "hoverPrimary",
          }}
          borderColor={Number(currentId) === id ? "primary" : "mainText"}
        >
          <Text
            textAlign={"center"}
            fontSize={"3xl"}
            color={"mainText"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            w={"100%"}
          >
            {content}
          </Text>
        </Center>
        <Flex flexDir={"column"}>
          {quizList.length !== 1 && (
            <QuestionDeleteButton id={Number(id)} initId={quizList[0].id} />
          )}
        </Flex>
      </Flex>
    </Center>
  );
}
