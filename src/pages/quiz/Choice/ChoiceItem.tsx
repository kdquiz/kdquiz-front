import { Center, Flex } from "@chakra-ui/react";
import { Choice } from "@/interface/Question.ts";
import { ChoiceDeleteButton } from "@/pages/quiz/Choice/ChoiceDeleteButton.tsx";
import { ChoiceCorrectButton } from "@/pages/quiz/Choice/ChoiceCorrectButton.tsx";
import { ChoiceInput } from "@/pages/quiz/Choice/ChoiceInput.tsx";

export function ChoiceItem({
  id,
  content,
  isCorrect,
  index,
  deleteAble,
}: Choice & {
  deleteAble?: boolean;
  index: number;
}) {
  return (
    <Center
      borderRadius={"24px"}
      bg={"buttonBg" + (index + 1)}
      h={"100px"}
      boxShadow={[0, null, "-4px 4px 4px #646363"]}
      position={"relative"}
    >
      <ChoiceInput id={id} content={content} isCorrect={isCorrect} />
      <Flex position={"absolute"} right={2} gap={2}>
        <ChoiceCorrectButton id={id} content={content} isCorrect={isCorrect} />
        {deleteAble && <ChoiceDeleteButton id={id} />}
      </Flex>
    </Center>
  );
}
