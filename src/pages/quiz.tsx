import {
  Center,
  Flex,
  Input,
  Text,
  Image,
  Textarea,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import Button from "@/components/Button.tsx";
import QuestionList from "@/components/QuestionList.tsx";

export default function QuizDetailPage() {
  const [searchParams] = useSearchParams();

  const quizId = Number(searchParams.get("id"));
  const questionId = searchParams.get("questionId") ?? 0;

  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery(
    "question_detail",
    () =>
      axios.get(
        import.meta.env.VITE_API_URL + "/api/v1/quiz/question/" + questionId,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      ),
  );

  const [questionData, setQuestionData] = useState(data);

  useEffect(() => {
    if (!quizId) navigate("/");
  }, []);

  useEffect(() => {
    refetch();
  }, [questionId, isLoading]);

  useEffect(() => {
    setQuestionData(data);
  }, [isLoading, data]);

  console.log(data);

  // const { mutate } = useMutation((data: any) =>
  //   axios.put(
  //     import.meta.env.VITE_API_URL + "/api/v1/quiz/" + quizId,
  //     { data },
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem("Authorization"),
  //       },
  //     },
  //   ),
  // );

  return (
    <Flex w={"100%"}>
      <QuestionList quizId={quizId} />
      <Center
        bgImage={"/images/play-bg.png"}
        w={"100%"}
        h={"100%"}
        bgSize={"cover"}
        bgPosition={"center"}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          questionData && (
            <Center
              p={6}
              w={"100%"}
              h={"100%"}
              flexDir={"column"}
              gap={10}
              maxW={["700px", null, null, "800px", "900px"]}
            >
              <Flex
                border={"white"}
                bg={"white"}
                w={"100%"}
                borderRadius={"24px"}
                boxShadow={[0, null, "-2px 2px 2px #646363"]}
              >
                <Input
                  defaultValue={questionData.data.data.content}
                  fontSize={"2xl"}
                  color={"mainText"}
                  textAlign={"center"}
                  w={"100%"}
                  h={"50px"}
                  borderRadius={"12px"}
                />
              </Flex>
              <Image src={"/images/img.png"} w={"80%"} />
              <Flex
                w={"100%"}
                flexWrap={"wrap"}
                justify={"space-between"}
                rowGap={5}
              >
                {questionData.data.data.choices.map((v: any, index: number) => (
                  <Center
                    borderRadius={"24px"}
                    bg={"buttonBg" + (index + 1)}
                    w={"49%"}
                    h={"100px"}
                    boxShadow={[0, null, "-4px 4px 4px #646363"]}
                    position={"relative"}
                  >
                    <Input
                      borderRadius={"24px"}
                      defaultValue={v.content}
                      color={"mainText"}
                      border={"none"}
                      fontSize={"4xl"}
                      textAlign={"center"}
                      h={"100%"}
                      maxLength={8}
                    />
                    <Flex position={"absolute"} right={2} gap={2}>
                      <Center cursor={"pointer"} onClick={() => {}}>
                        <FaCheckCircle
                          fontSize={"36px"}
                          color={v.isCorrect ? "#FFFFFF" : "#646363"}
                        />
                      </Center>
                      <Center
                        onClick={() => {
                          // data.data.data.questions[number].choices.splice(
                          //   index,
                          //   1,
                          // );
                          // // mutate({...data, data.data.data.questions[number].choices : data.data.data.questions[number].choices});
                          // console.log(
                          //   data.data.data.questions[number].choices,
                          // );
                          // console.log({ ...data.data.data, questions });
                        }}
                        cursor={"pointer"}
                      >
                        <FaTrashAlt fontSize={"36px"} color={"#646363"} />
                      </Center>
                    </Flex>
                  </Center>
                ))}
              </Flex>
            </Center>
          )
        )}
      </Center>
      <Flex w={"400px"} bg={"white"} h={"100%"} p={4}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          data && (
            <Flex w={"100%"} gap={2} flexDir={"column"}>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  퀴즈 유형
                </Text>
                <Select defaultValue={0} color={"mainText"} size={"md"}>
                  <option value={0}>객관식</option>
                  <option value={1}>단답형</option>
                </Select>
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  제한 시간
                </Text>
                <Input
                  fontSize={"md"}
                  color={"mainText"}
                  w={"100%"}
                  defaultValue={70}
                  textAlign={"end"}
                />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  배점
                </Text>
                <Input
                  fontSize={"md"}
                  color={"mainText"}
                  w={"100%"}
                  defaultValue={50}
                  textAlign={"end"}
                />
              </Flex>
              <Flex gap={2} justify={"space-between"}>
                <Text fontSize={"md"} color={"mainText"}>
                  답변 재선택
                </Text>
                <Checkbox color={"primary"} size={"md"} />
              </Flex>
              <Flex gap={2} justify={"space-between"}>
                <Text fontSize={"md"} color={"mainText"}>
                  힌트 사용
                </Text>
                <Checkbox color={"primary"} size={"md"} />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  힌트 제공 시간
                </Text>
                <Input
                  fontSize={"md"}
                  color={"mainText"}
                  w={"100%"}
                  defaultValue={30}
                  textAlign={"end"}
                />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  힌트 내용
                </Text>
                <Textarea fontSize={"md"} color={"mainText"} w={"100%"} />
              </Flex>
              <Flex gap={2} justify={"space-between"}>
                <Text fontSize={"md"} color={"mainText"}>
                  AI 피드백 사용
                </Text>
                <Checkbox color={"primary"} size={"md"} />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  AI 피드백 질문
                </Text>
                <Textarea fontSize={"md"} color={"mainText"} w={"100%"} />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"md"} color={"mainText"}>
                  해설
                </Text>
                <Textarea fontSize={"md"} color={"mainText"} w={"100%"} />
              </Flex>
              <Button
                type="submit"
                w={"100%"}
                fontSize={["md", null, "md"]}
                h={["30px", null, "40px"]}
                borderRadius={"6px"}
                bg={"primary"}
                color={"white"}
                border={"2px"}
                borderColor={"primary"}
              >
                저장
              </Button>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  );
}
