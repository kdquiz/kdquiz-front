import { FaTrashAlt } from "react-icons/fa";
import { Center } from "@chakra-ui/react";
import { useMutation } from "react-query";
import axios from "axios";

export function QuestionDeleteButton({ id }: { id: number }) {
  const { mutate } = useMutation(() =>
    axios.delete(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }),
  );

  return (
    <Center
      onClick={() => {
        mutate;
      }}
      cursor={"pointer"}
    >
      <FaTrashAlt fontSize={"36px"} color={"#646363"} />
    </Center>
  );
}
