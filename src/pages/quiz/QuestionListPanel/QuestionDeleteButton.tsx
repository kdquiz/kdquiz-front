import { FaTrashAlt } from "react-icons/fa";
import { Center } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function QuestionDeleteButton({
  id,
  initId,
}: {
  id: number;
  initId: number;
}) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const questionIid = Number(searchParams.get("id"));

  const { mutate } = useMutation({
    mutationFn: () =>
      axios.delete(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }),
    onSuccess: () => {
      if (questionIid === id) {
        searchParams.set("id", String(initId));
        setSearchParams(searchParams);
      }
      queryClient.invalidateQueries({ queryKey: ["questionList"] });
    },
  });

  return (
    <Center
      onClick={() => {
        mutate();
      }}
      cursor={"pointer"}
      transition={".25s"}
      _hover={{
        opacity: 0.5,
      }}
    >
      <FaTrashAlt fontSize={"36px"} color={"#646363"} />
    </Center>
  );
}
