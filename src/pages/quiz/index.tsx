import { Box } from "@chakra-ui/react";
import { QuestionListPanel } from "@/pages/quiz/QuestionListPanel/QuestionListPanel.tsx";
import { QuestionSetPanel } from "./QuestionSetPanel.tsx";
import { QuestionDetail } from "@/pages/quiz/QuestionDetail.tsx";

export default function QuizDetailPage() {
  return (
    <Box pos={"relative"} w={"100%"}>
      <QuestionListPanel />
      <QuestionDetail />
      <QuestionSetPanel />
    </Box>
  );
}
