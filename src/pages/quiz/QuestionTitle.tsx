import { Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Question } from "@/interface/Question.ts";

export function QuestionTitle({ id, data }: { id: number; data: Question }) {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (value: string) => {
      return await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/" + id,
        {
          ...data,
          content: value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["quizDetail", "questionList"] });
    },
  });

  return (
    <Input
      defaultValue={data ? data?.content : ""}
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
