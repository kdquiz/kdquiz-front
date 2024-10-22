import { Select } from "@chakra-ui/react";
import { Question } from "@/interface/Question.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function QuestionTypeSelect({
  id,
  data,
}: {
  id: number;
  data: Question;
}) {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (value: number) => {
      return await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/" + id,
        {
          ...data,
          type: value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["quizDetail"] });
    },
  });

  return (
    <Select
      // defaultValue={type}
      defaultValue={data.type}
      color={"mainText"}
      size={"lg"}
      onChange={(event) => {
        // setType(Number(event.target.value));
        mutate(Number(event.target.value));
      }}
    >
      <option value={0}>객관식</option>
      <option value={1}>단답형</option>
    </Select>
  );
}
