import { Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function ChoiceInput({
  id,
  content,
  isCorrect,
}: {
  id: number;
  content: string;
  isCorrect: boolean;
}) {
  const client = useQueryClient();

  const { mutate } = useMutation(
    async (value: string) =>
      axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/choice/",
        {
          id: id,
          content: value,
          isCorrect: isCorrect,
          shortAnswer: "단답형",
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      ),
    { onSuccess: () => client.invalidateQueries({ queryKey: "quizDetail" }) },
  );
  return (
    <Input
      borderRadius={"24px"}
      defaultValue={content}
      color={"white"}
      border={"none"}
      fontSize={"3xl"}
      textAlign={"center"}
      h={"100%"}
      maxLength={16}
      onBlur={(event) => {
        mutate(event.target.value);
      }}
    />
  );
}
