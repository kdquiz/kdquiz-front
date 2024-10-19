import { FaTrashAlt } from "react-icons/fa";
import { Center } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function ChoiceDeleteButton({ id }: { id: number }) {
  const client = useQueryClient();
  const { mutate: deleteChoice } = useMutation(
    async () =>
      await axios.delete(
        import.meta.env.VITE_API_URL + "/api/v1/question/choice/" + id,
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
    <Center onClick={() => deleteChoice()} cursor={"pointer"}>
      <FaTrashAlt fontSize={"36px"} color={"#646363"} />
    </Center>
  );
}
