import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Center } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export function ChoiceCorrectButton({
  id,
  content,
  isCorrect,
  unCorrectAble,
}: {
  id: number;
  content: string;
  isCorrect: boolean;
  unCorrectAble?: boolean;
}) {
  const client = useQueryClient();
  const { mutate: setIsCorrect } = useMutation({
    mutationFn: async () =>
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
    onSuccess: () => client.invalidateQueries({ queryKey: ["quizDetail"] }),
  });

  return (
    <Center
      cursor={"pointer"}
      onClick={() =>
        !isCorrect ? setIsCorrect() : !unCorrectAble && setIsCorrect()
      }
      opacity={"70%"}
    >
      <FaCheckCircle
        fontSize={"36px"}
        color={isCorrect ? "#FFFFFF" : "#646363"}
      />
    </Center>
  );
}
