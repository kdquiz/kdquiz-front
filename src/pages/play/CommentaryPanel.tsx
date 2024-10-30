import { Box, Text, VStack } from "@chakra-ui/react";
import { FadeInSlideUpWrapper } from "@/components/layout/FadeInSlideUpWrapper.tsx";
import { QuizContainer } from "@/components/layout/QuizContainer.tsx";
import Button from "@/components/Button.tsx";
import { Question } from "@/interface/Question.ts";

export function CommentaryPanel({
  viewComment,
  currentQuestion,
  onClickNext,
}: {
  viewComment: "correct" | "incorrect" | "timeout" | null;
  currentQuestion: Question;
  onClickNext: () => void;
}) {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      position={"fixed"}
      bg={"rgb(0, 0, 0, 0.3)"}
      alignContent={"center"}
      textAlign={"center"}
      display={!viewComment ? "none" : "revert"}
      p={4}
    >
      <FadeInSlideUpWrapper>
        <QuizContainer>
          <VStack gap={4} px={4} py={"8"}>
            <Text fontSize={"4xl"}>
              {viewComment &&
                {
                  correct: "정답!!",
                  incorrect: "오답!!",
                  timeout: "시간초과!",
                }[viewComment]}
            </Text>
            {currentQuestion.type === 1 && (
              <Text fontSize={"4xl"} color={"primary"} wordBreak={"keep-all"}>
                {currentQuestion.shortAnswer}
              </Text>
            )}
            <Text fontSize={"3xl"} wordBreak={"keep-all"}>
              {currentQuestion.options.commentary}
            </Text>
            <Button
              borderRadius={"12px"}
              bg={"primary"}
              border={"2px"}
              borderColor={"primary"}
              boxShadow={"2px 2px 2px #646363"}
              p={5}
              gap={2}
              onClick={onClickNext}
            >
              <Text fontSize={"2xl"} color={"white"}>
                다음
              </Text>
            </Button>
          </VStack>
        </QuizContainer>
      </FadeInSlideUpWrapper>
    </Box>
  );
}
