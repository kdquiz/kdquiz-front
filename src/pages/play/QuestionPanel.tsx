import { QuizContainer } from "@/components/layout/QuizContainer.tsx";
import { Center, Image, Text, VStack } from "@chakra-ui/react";
import { FadeInSlideRightWrapper } from "@/components/layout/FadeInSlideRightWrapper.tsx";
import { Question } from "@/interface/Question.ts";

export function QuestionPanel({
  currentQuestion,
}: {
  currentQuestion: Question;
}) {
  return (
    <FadeInSlideRightWrapper
      key={currentQuestion.id}
      width={"100%"}
      height={"50%"}
    >
      <QuizContainer w={"100%"} gap={4} h={"100%"}>
        <VStack h={"100%"} justify={"center"}>
          <Center p={1}>
            <Text fontSize={currentQuestion.fileUrl ? "2xl" : "4xl"}>
              {currentQuestion.content}
            </Text>
          </Center>
          {currentQuestion.fileUrl && (
            <Image
              w={"100%"}
              aspectRatio={"5/3"}
              objectFit={"cover"}
              objectPosition={"center"}
              src={import.meta.env.VITE_API_URL + "/" + currentQuestion.fileUrl}
            />
          )}
        </VStack>
      </QuizContainer>
    </FadeInSlideRightWrapper>
  );
}
