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
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export default function QuizDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const quizId = searchParams.get("id");
  const number = searchParams.get("number") ?? 0;

  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess } = useQuery("quiz_detail", () =>
    axios.get(import.meta.env.VITE_API_URL + "/api/v1/quiz/user/" + quizId, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }),
  );

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

  useEffect(() => {
    if (!quizId) navigate("/");
  }, []);

  console.log();

  return (
    <Flex w={"100%"}>
      <Flex w={"400px"} flexDir={"column"} h={"100%"}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          data &&
          isSuccess &&
          data.data.data.questions.map((v: any, index: number) => (
            <Center flexDir={"column"} w={"100%"} p={4} gap={1}>
              <Text fontSize={"xl"} color={"mainText"} w={"100%"}>
                {index + 1}.
              </Text>
              <Flex w={"100%"} gap={2}>
                <Center
                  onClick={() => {
                    searchParams.set("number", String(index));
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
                  borderColor={
                    Number(number) === index ? "primary" : "mainText"
                  }
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
                  <Center onClick={() => {}} cursor={"pointer"}>
                    <FaTrashAlt fontSize={"36px"} color={"#646363"} />
                  </Center>
                </Flex>
              </Flex>
            </Center>
          ))
        )}
      </Flex>
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
          data && (
            <Center
              p={6}
              w={"100%"}
              h={"100%"}
              flexDir={"column"}
              gap={10}
              maxW={"1000px"}
            >
              <Flex
                border={"white"}
                bg={"white"}
                w={"100%"}
                borderRadius={"24px"}
                boxShadow={[0, null, "-2px 2px 2px #646363"]}
              >
                <Input
                  defaultValue={data?.data.data.questions[number].content}
                  fontSize={"5xl"}
                  color={"mainText"}
                  textAlign={"center"}
                  w={"100%"}
                  h={"100px"}
                  borderRadius={"24px"}
                />
              </Flex>
              <Image src={"/images/img.png"} w={"80%"} />
              <Flex
                w={"100%"}
                flexWrap={"wrap"}
                justify={"space-between"}
                rowGap={5}
              >
                {data.data.data.questions[number].choices.map(
                  (v: any, index: number) => (
                    <Center
                      borderRadius={"24px"}
                      bg={"buttonBg" + (index + 1)}
                      w={"49%"}
                      h={"120px"}
                      boxShadow={[0, null, "-4px 4px 4px #646363"]}
                      position={"relative"}
                    >
                      <Input
                        borderRadius={"24px"}
                        defaultValue={v.content}
                        color={"mainText"}
                        border={"none"}
                        fontSize={"6xl"}
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
                  ),
                )}
              </Flex>
            </Center>
          )
        )}
      </Center>
      <Flex w={"400px"} p={5}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          data && (
            <Flex w={"100%"} gap={4} flexDir={"column"}>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  퀴즈 유형
                </Text>
                <Select defaultValue={0} color={"mainText"} size={"lg"}>
                  <option value={0}>객관식</option>
                  <option value={1}>단답형</option>
                </Select>
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  제한 시간
                </Text>
                <Input
                  fontSize={"2xl"}
                  color={"mainText"}
                  w={"100%"}
                  defaultValue={70}
                  textAlign={"end"}
                />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  배점
                </Text>
                <Input
                  fontSize={"2xl"}
                  color={"mainText"}
                  w={"100%"}
                  defaultValue={50}
                  textAlign={"end"}
                />
              </Flex>
              <Flex gap={2} justify={"space-between"}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  답변 재선택
                </Text>
                <Checkbox color={"primary"} size={"lg"} />
              </Flex>
              <Flex gap={2} justify={"space-between"}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  힌트 사용
                </Text>
                <Checkbox color={"primary"} size={"lg"} />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  힌트 제공 시간
                </Text>
                <Input
                  fontSize={"2xl"}
                  color={"mainText"}
                  w={"100%"}
                  defaultValue={30}
                  textAlign={"end"}
                />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  힌트 내용
                </Text>
                <Textarea fontSize={"2xl"} color={"mainText"} w={"100%"} />
              </Flex>
              <Flex gap={2} justify={"space-between"}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  AI 피드백 사용
                </Text>
                <Checkbox color={"primary"} size={"lg"} />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  AI 피드백 질문
                </Text>
                <Textarea fontSize={"2xl"} color={"mainText"} w={"100%"} />
              </Flex>
              <Flex flexDir={"column"} gap={2}>
                <Text fontSize={"2xl"} color={"mainText"}>
                  해설
                </Text>
                <Textarea fontSize={"2xl"} color={"mainText"} w={"100%"} />
              </Flex>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  );
}
