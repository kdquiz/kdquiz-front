import { FaTrashAlt } from "react-icons/fa";
import { Center } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { App, notification } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Quiz } from "@/interface/Quiz.ts";

export function QuizDeleteButton({
  id,
  title,
  setSelectId,
}: Pick<Quiz, "id" | "title"> & {
  setSelectId: Dispatch<SetStateAction<number | boolean | undefined>>;
}) {
  const { modal } = App.useApp();

  const client = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (v: string) => {
      await axios.delete(import.meta.env.VITE_API_URL + "/api/v1/quiz/" + v, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });
    },
    onSuccess: () => {
      setSelectId(false);
      client.invalidateQueries({ queryKey: ["quizList"] });
      notification.success({ message: "퀴즈 삭제 완료되었습니다." });
    },
    onError: () => notification.error({ message: "퀴즈 삭제 실패했습니다." }),
  });

  const deleteModal = (v: any) => {
    modal.confirm({
      title: "퀴즈 삭제",
      content: title + " 퀴즈를 삭제할까요?",
      onOk: () => deleteMutate(v),
    });
  };

  return (
    <Center cursor={"pointer"} onClick={() => deleteModal(id)}>
      <FaTrashAlt fontSize={"36px"} color={"#646363"} />
    </Center>
  );
}
