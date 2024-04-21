import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Center, Flex, Image, Input, Text } from "@chakra-ui/react";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Quiz } from "@/interface/Quiz.ts";
import Button from "@/components/Button.tsx";
import { useState } from "react";
import { App, Modal, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

export default function QuizList() {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    "quiz",
    () =>
      axios.get(import.meta.env.VITE_API_URL + "/api/v1/quiz/user", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }),
  );

  const { mutate: deleteMutate } = useMutation(
    async (v: any) => {
      await axios.delete(
        import.meta.env.VITE_API_URL + "/api/v1/quiz/" + v.id,
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    {
      onSuccess: () => {
        setSelectId(false);
        refetch();
        reset();
        notification.success({ message: "퀴즈 삭제 완료되었습니다." });
      },
      onError: () => notification.error({ message: "퀴즈 삭제 실패했습니다." }),
    },
  );

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate } = useMutation(
    async (v: any) => {
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/quiz/" + selectId,
        { title: v.title },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    {
      onSuccess: async () => {
        setSelectId(false);
        refetch();
        reset();
        notification.success({ message: "퀴즈 이름 변경되었습니다." });
      },
      onError: () =>
        notification.error({ message: "퀴즈 이름 변경에 실패했습니다." }),
    },
  );

  const { mutate: create } = useMutation(
    async (data: any) => {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/quiz",
        {
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
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    {
      onSuccess: () => {
        refetch();
        setSelectId(false);
        notification.success({ message: "퀴즈 생성에 성공했습니다." });
      },
      onError: () =>
        notification.error({ message: "퀴즈 생성에 실패했습니다." }),
    },
  );

  const { modal } = App.useApp();

  const deleteModal = (v: any) => {
    modal.confirm({
      title: "퀴즈 삭제",
      content: v.title + " 퀴즈를 삭제할까요?",
      onOk: () => deleteMutate(v),
    });
  };

  const [selectId, setSelectId] = useState<number | boolean>();

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
            data.data.data.map((v: Quiz) => (
              <Center
                borderRightRadius={"16px"}
                borderBottomLeftRadius={"16px"}
                bg={"primary"}
                p={"0 16px 16px 0"}
                w={"100%"}
                boxShadow={["none", null, "-4px 4px 4px #646363"]}
                _hover={{
                  boxShadow: "0px 0px 0px #646363",
                }}
                _active={{
                  boxShadow: "inset -2px 2px 2px #646363, 0px 0px 0px #646363",
                }}
                transition={"0.25s"}
              >
                <Flex
                  h={["100px", null, "170px"]}
                  bg={"white"}
                  w="100%"
                  transition={"0.25s"}
                  role={"group"}
                  gap={3}
                  borderTop={"1px"}
                  borderColor={"primary"}
                >
                  <Image
                    src={"/images/play-bg.png"}
                    w={["100px", null, "200px"]}
                    objectFit={"cover"}
                  />
                  <Flex w={"100%"} flexDir={["column", null, "row"]}>
                    <Flex
                      flexDir={"column"}
                      justify={"space-between"}
                      m={[1, null, 3]}
                      w={"100%"}
                    >
                      <Text
                        fontSize={["md", null, "xl", "3xl"]}
                        color={"mainText"}
                        _hover={{ textDecoration: "underline" }}
                        cursor={"pointer"}
                      >
                        {v.title}
                      </Text>
                      <Flex gap={2} alignItems={"center"}>
                        <Center display={["none", null, "flex"]}>
                          <FaUserCircle fontSize={"36px"} color={"#646363"} />
                        </Center>
                        <Center display={["flex", null, "none"]}>
                          <FaUserCircle fontSize={"24px"} color={"#646363"} />
                        </Center>
                        <Text
                          fontSize={["sm", null, "md", "2xl"]}
                          color={"mainText"}
                        >
                          {localStorage.getItem("email")}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      m={[1, null, 3]}
                      flexDir={["row", null, "column"]}
                      w={["100%", null, "120px"]}
                      justify={["flex-end", null, "space-between"]}
                      alignItems={["center", null, "initial"]}
                      gap={[2, null, 0]}
                      pr={[5, null, 0]}
                    >
                      <Center
                        justifyContent={"space-between"}
                        gap={[2, null, 0]}
                      >
                        <Center
                          display={["none", null, "flex"]}
                          cursor={"pointer"}
                          onClick={() => setSelectId(v.id)}
                        >
                          <MdModeEditOutline
                            fontSize={"48px"}
                            color={"#646363"}
                          />
                        </Center>
                        <Center
                          display={["flex", null, "none"]}
                          cursor={"pointer"}
                          onClick={() => setSelectId(v.id)}
                        >
                          <MdModeEditOutline
                            fontSize={"36px"}
                            color={"#646363"}
                          />
                        </Center>
                        <Center
                          display={["none", null, "flex"]}
                          cursor={"pointer"}
                          onClick={() => deleteModal(v)}
                        >
                          <FaTrashAlt fontSize={"36px"} color={"#646363"} />
                        </Center>
                        <Center
                          display={["flex", null, "none"]}
                          cursor={"pointer"}
                          onClick={() => deleteModal(v)}
                        >
                          <FaTrashAlt fontSize={"24px"} color={"#646363"} />
                        </Center>
                      </Center>
                      <Button
                        color={"white"}
                        fontSize={["md", null, "xl", null, "3xl"]}
                        bg={"primary"}
                        borderRadius={"6px"}
                        w={["60px", null, "100px", null, "120px"]}
                        h={["30px", null, "50px", null, "60px"]}
                      >
                        시작!
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Center>
            ))
          )}
          <Button
            color={"white"}
            bg={"primary"}
            borderRadius={"6px"}
            fontSize={["md", null, "xl"]}
            p={4}
            onClick={() => setSelectId(true)}
          >
            퀴즈 생성
          </Button>
        </Center>
        <Modal
          open={!!selectId}
          closeIcon={null}
          onCancel={() => setSelectId(undefined)}
          footer={null}
        >
          <Center flexDir={"column"} gap={4}>
            <Text fontSize={["xl", null, "3xl"]} color={"mainText"}>
              {selectId === true ? "퀴즈 생성" : "퀴즈 수정"}
            </Text>
            <form
              onSubmit={handleSubmit((data) =>
                selectId === true ? create(data) : mutate(data),
              )}
            >
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
                    {errors.title?.type === "required" &&
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
                  {selectId === true ? "생성" : "수정"}
                </Button>
              </Flex>
            </form>
          </Center>
        </Modal>
      </>
    );
  }
}
