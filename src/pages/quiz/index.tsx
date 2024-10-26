import { Box } from "@chakra-ui/react";
import { QuestionListPanel } from "@/pages/quiz/QuestionListPanel/QuestionListPanel.tsx";
import { QuestionSetPanel } from "./QuestionSetPanel.tsx";
import { QuestionDetail } from "@/pages/quiz/QuestionDetail.tsx";

export default function QuizDetailPage() {
  return (
    <Box
      pos={"relative"}
      h={["calc(100vh - 36px)", null, "calc(100vh - 72px)"]}
      w={"100%"}
      alignContent={"center"}
      mt={["36px", null, "72px"]}
    >
      <QuestionListPanel />
      <QuestionDetail />
      <QuestionSetPanel />
    </Box>
  );
}
