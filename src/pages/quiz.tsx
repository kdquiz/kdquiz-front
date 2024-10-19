import { Box } from "@chakra-ui/react";
import { QuestionListPanel } from "@/components/quiz/QuestionListPanel/QuestionListPanel.tsx";
import { QuestionSetPanel } from "../components/quiz/QuestionSetPanel.tsx";
import { QuestionDetail } from "@/components/quiz/QuestionDetail.tsx";

export default function QuizDetailPage() {
  return (
    <Box pos={"relative"} w={"100%"}>
      <QuestionListPanel />
      <QuestionDetail />
      <QuestionSetPanel />
    </Box>
  );
}
