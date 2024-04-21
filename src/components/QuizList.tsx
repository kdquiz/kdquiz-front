import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Center, Flex, Input, Text } from "@chakra-ui/react";
import QuizItem from "@/components/QuizItem.tsx";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Quiz } from "@/interface/Quiz.ts";
import Button from "@/components/Button.tsx";
import { useState } from "react";
import { Modal, notification } from "antd";
import { Controller, useForm } from "react-hook-form";

export default function QuizList() {
  const { data, isLoading, isSuccess, isError } = useQuery("quiz", () =>
    axios.get(import.meta.env.VITE_API_URL + "/api/v1/quiz/user", {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }),
  );

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate } = useMutation(
    async (data: any) => {
      await axios.post(import.meta.env.VITE_API_URL + "/api/v1/quiz", {
        title: data.title,
        type: "string",
        questions: [
          {
            content: "문제1",
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
      });
    },
    {
      onSuccess: () =>
        notification.success({ message: "퀴즈 생성에 성공했습니다." }),
      onError: () =>
        notification.error({ message: "퀴즈 생성에 실패했습니다." }),
    },
  );

  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) return <Loading />;
  if (isError || data?.data.code === "Q202") return <Error />;
  if (data && isSuccess) {
    return (
      <>
        <Center m={[0, null, 3, 5]} flexDir={"column"} gap={4}>
          {data?.data.code === "Q102" ? (
            <Center>
              <Text
                fontSize={["md", null, "2xl"]}
                color={"mainText"}
                whiteSpace={"pre-wrap"}
                textAlign={"center"}
              >
                {"퀴즈가 없습니다!\n아래 버튼을 눌러 퀴즈를 생성하세요!"}
              </Text>
            </Center>
          ) : (
            data.data.map((v: Quiz) => <QuizItem data={v} />)
          )}
          <Button
            color={"white"}
            bg={"primary"}
            borderRadius={"6px"}
            fontSize={["md", null, "xl"]}
            p={4}
            onClick={() => setOpen(!open)}
          >
            퀴즈 생성
          </Button>
        </Center>
        <Modal
          open={open}
          closeIcon={null}
          onCancel={() => setOpen(false)}
          footer={null}
        >
          <Center flexDir={"column"} gap={4}>
            <Text fontSize={["xl", null, "3xl"]} color={"mainText"}>
              퀴즈 생성
            </Text>
            <form onSubmit={handleSubmit((data) => mutate(data))}>
              <Flex flexDir={"column"} gap={1}>
                <Text fontSize={["sm", null, "md"]} color={"mainText"}>
                  퀴즈 타이틀
                </Text>
                <Flex gap={1}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        {...register("title", {
                          required: true,
                        })}
                        w={["auto", null, "274px"]}
                        fontSize={["sm", null, "md"]}
                        maxLength={20}
                      />
                    )}
                    name={"email"}
                    control={control}
                  />
                </Flex>
                <Flex h={["20px", null, "30px"]} ml={2}>
                  <Text color={"error"} fontSize={"xs"}>
                    {errors.email?.type === "required" &&
                      "퀴즈 타이틀을 입력해주세요."}
                  </Text>
                </Flex>
              </Flex>
              <Flex w={"100%"} justify={"flex-end"}>
                <Button
                  type="submit"
                  w={"100px"}
                  fontSize={["md", null, "xl"]}
                  h={["30px", null, "40px"]}
                  borderRadius={"6px"}
                  bg={"primary"}
                  color={"white"}
                >
                  생성
                </Button>
              </Flex>
            </form>
          </Center>
        </Modal>
      </>
    );
  }
}
