import { Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Question } from "@/interface/Question.ts";

export function QuestionSubjectInput({
  id,
  data,
}: {
  id: number;
  data: Question;
}) {
  const client = useQueryClient();
  const { mutate } = useMutation(
    async (value: string) => {
      return await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/" + id,
        {
          ...data,
          shortAnswer: value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: "quizDetail" });
        client.invalidateQueries({ queryKey: "questionList" });
      },
    },
  );

  return (
    <Input
      defaultValue={data ? data?.shortAnswer : ""}
      disabled={!data}
      fontSize={"5xl"}
      color={"mainText"}
      textAlign={"center"}
      w={"100%"}
      h={"100px"}
      borderRadius={"24px"}
      onBlur={(event) => mutate(event.target.value)}
    />
  );
}
