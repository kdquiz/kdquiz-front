import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Center } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export function ChoiceCorrectButton({
  id,
  content,
  isCorrect,
}: {
  id: number;
  content: string;
  isCorrect: boolean;
}) {
  const client = useQueryClient();
  const { mutate: setIsCorrect } = useMutation(
    async () =>
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/choice/",
        {
          id: id,
          content: content,
          isCorrect: !isCorrect,
          shortAnswer: "단답형",
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      ),
    {
      onSuccess: () => client.invalidateQueries({ queryKey: "quizDetail" }),
    },
  );

  return (
    <Center cursor={"pointer"} onClick={() => setIsCorrect()}>
      <FaCheckCircle
        fontSize={"36px"}
        color={isCorrect ? "#FFFFFF" : "#646363"}
      />
    </Center>
  );
}
