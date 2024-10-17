import { MdAddCircleOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function ChoiceAddButton({ questionId }: { questionId: number }) {
  const client = useQueryClient();
  const { mutate: createChoice } = useMutation(
    async () => {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/question/choice/" + questionId,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    {
      onSuccess: () => client.invalidateQueries({ queryKey: "quizDetail" }),
    },
  );

  return (
    <MdAddCircleOutline
      fontSize={"48px"}
      color={"gray"}
      cursor={"pointer"}
      onClick={() => {
        createChoice();
      }}
    />
  );
}
