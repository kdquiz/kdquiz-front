import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Box, Center } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { QuestionItem } from "@/pages/quiz/QuestionListPanel/QuestionItem.tsx";

export function QuestionListPanel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const quizId = searchParams.get("quiz-id");
  const id = Number(searchParams.get("id")) ?? 0;

  const { data, isPending, isError, isSuccess, refetch } = useQuery({
    queryKey: ["questionList"],
    queryFn: async () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/api/v1/quiz/" + quizId, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((data) => {
          if (!id) {
            searchParams.set("id", data?.data.data.questions[0].id);
            setSearchParams(searchParams);
          }
          return data.data.data.questions;
        }),
  });

  const { mutate: createQuestion } = useMutation({
    mutationFn: async () => {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/question/" + quizId,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    onSuccess: () => refetch(),
  });

  return (
    <Box
      w={"300px"}
      flexDir={"column"}
      h={"100%"}
      bg={"whitesmoke"}
      pos={"absolute"}
      overflowY={"scroll"}
      pb={"100px"}
      zIndex={5}
      style={{ scrollbarWidth: "none" }}
    >
      {isPending ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        data &&
        isSuccess &&
        data.map((v: any, index: number) => (
          <QuestionItem {...v} index={index} quizList={data} />
        ))
      )}
      <Center>
        <MdAddCircleOutline
          fontSize={"30px"}
          color={"gray"}
          cursor={"pointer"}
          onClick={() => {
            createQuestion();
          }}
        />
      </Center>
    </Box>
  );
}
