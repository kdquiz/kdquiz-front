import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Center, Flex, Text } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function QuestionList({ quizId }: { quizId: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const questionId = searchParams.get("questionId") ?? 0;

  const { data, isLoading, isError, isSuccess } = useQuery("quiz_detail", () =>
    axios.get(import.meta.env.VITE_API_URL + "/api/v1/quiz/user/" + quizId, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }),
  );

  useEffect(() => {
    if (isSuccess && data) {
      searchParams.set("questionId", data.data.data.questions[0].id);
      setSearchParams(searchParams);
    }
  }, [isSuccess]);

  const { mutate: create } = useMutation(() =>
    axios.post(
      import.meta.env.VITE_API_URL + "/api/v1/quiz/question/" + quizId,
      {
        questions: [
          {
            content: "문제",
            options: {
              useHint: true,
              hintTime: 30,
              hintContent: "힌트",
              useAiFeedback: true,
              aiQuestion: "ai 피드백",
              commentary: "코멘트 피드백",
              score: 20,
            },
            choices: [
              {
                content: "1",
                isCorrect: true,
              },
              {
                content: "2",
                isCorrect: false,
              },
              {
                content: "3",
                isCorrect: false,
              },
              {
                content: "4",
                isCorrect: false,
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    ),
  );

  const { mutate: questionDelete } = useMutation((key: number) =>
    axios.delete(import.meta.env.VITE_API_URL + "/api/v1/quiz/question/" + key),
  );

  console.log(data);
  console.log(data?.data.data.questions);

  return (
    <Flex minW={"200px"} flexDir={"column"} h={"100%"} bg={"white"}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        data &&
        isSuccess &&
        data.data.data.questions.map((v: any, index: number) => (
          <Center flexDir={"column"} w={"100%"} p={2} gap={1}>
            <Text
              fontSize={"md"}
              color={Number(questionId) === v.id ? "primary" : "mainText"}
              w={"100%"}
            >
              {index + 1}.
            </Text>
            <Flex w={"100%"} gap={2} role={"group"}>
              <Center
                onClick={() => {
                  searchParams.set("questionId", v.id);
                  setSearchParams(searchParams);
                }}
                transition={"0.25s"}
                cursor={"pointer"}
                w={"150px"}
                h={"100px"}
                borderRadius={"6px"}
                bg={"select"}
                bgImage={"/images/play-bg.png"}
                bgSize={"cover"}
                overflow={"hidden"}
                border={"4px"}
                borderColor={
                  Number(questionId) === v.id ? "primary" : "mainText"
                }
              >
                <Text
                  textAlign={"center"}
                  fontSize={"2xl"}
                  color={"mainText"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  w={"100%"}
                >
                  {v.content}
                </Text>
              </Center>
              <Flex
                flexDir={"column"}
                display={"none"}
                _groupHover={
                  data.data.data.questions.length > 1
                    ? {
                        display: "flex",
                      }
                    : {}
                }
              >
                <Center
                  onClick={() => {
                    questionDelete(v.id);
                  }}
                  cursor={"pointer"}
                >
                  <FaTrashAlt fontSize={"24px"} color={"#646363"} />
                </Center>
              </Flex>
            </Flex>
          </Center>
        ))
      )}
      <Center>
        <MdAddCircleOutline
          fontSize={"24px"}
          color={"#646363"}
          onClick={() => create()}
          cursor={"pointer"}
        />
      </Center>
    </Flex>
  );
}
