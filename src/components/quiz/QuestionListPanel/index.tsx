import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { QuestionDeleteButton } from "@/components/quiz/QuestionListPanel/QuestionDeleteButton.tsx";
import { MdAddCircleOutline } from "react-icons/md";

export function QuestionListPanel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const quizId = searchParams.get("quiz-id");
  const id = Number(searchParams.get("id")) ?? 0;

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    "questionList",
    () =>
      axios.get(import.meta.env.VITE_API_URL + "/api/v1/quiz/" + quizId, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }),
  );

  const { mutate: createQuestion } = useMutation(
    async () => {
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
    {
      onSuccess: () => refetch(),
    },
  );

  useEffect(() => {
    if (!id && !isLoading && !isError) {
      searchParams.set("id", data?.data.data.questions[0].id);
      setSearchParams(searchParams);
    }
  }, [data?.data.data, isError, isLoading, id, searchParams, setSearchParams]);

  return (
    <Box
      w={"300px"}
      flexDir={"column"}
      h={"100%"}
      bg={"white"}
      pos={"fixed"}
      overflowY={"scroll"}
      pb={"100px"}
    >
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        data &&
        isSuccess &&
        data.data.data.questions.map((v: any, index: number) => (
          <Center flexDir={"column"} w={"100%"} p={4} gap={1} key={index}>
            <Text fontSize={"xl"} color={"mainText"} w={"100%"}>
              {index + 1}.
            </Text>
            <Flex w={"100%"} gap={2}>
              <Center
                onClick={() => {
                  searchParams.set("id", String(v.id));
                  setSearchParams(searchParams);
                }}
                cursor={"pointer"}
                w={"200px"}
                h={"150px"}
                borderRadius={"6px"}
                bg={"select"}
                bgImage={"/images/play-bg.png"}
                bgSize={"cover"}
                overflow={"hidden"}
                border={"4px"}
                borderColor={Number(id) === v.id ? "primary" : "mainText"}
              >
                <Text
                  textAlign={"center"}
                  fontSize={"3xl"}
                  color={"mainText"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  w={"100%"}
                >
                  {v.content}
                </Text>
              </Center>
              <Flex flexDir={"column"}>
                {data.data.data.questions.length !== 1 && (
                  <QuestionDeleteButton
                    id={Number(v.id)}
                    initId={data.data.data.questions[0].id}
                  />
                )}
              </Flex>
            </Flex>
          </Center>
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
