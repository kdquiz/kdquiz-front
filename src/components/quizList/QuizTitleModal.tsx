import { Center, Flex, Input, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button.tsx";
import { Modal, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export function QuizTitleModal({
  selectId,
  setSelectId,
}: {
  selectId?: number | boolean;
  setSelectId: Dispatch<SetStateAction<number | boolean | undefined>>;
}) {
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (v: any) => {
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
    onSuccess: async () => {
      setSelectId(false);
      client.invalidateQueries({ queryKey: ["quizList"] });
      reset();
      notification.success({ message: "퀴즈 이름 변경되었습니다." });
    },
    onError: () =>
      notification.error({ message: "퀴즈 이름 변경에 실패했습니다." }),
  });

  const { mutate: create } = useMutation({
    mutationFn: async (data: any) => {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/quiz/",
        {
          title: data.title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["quizList"] });
      setSelectId(false);
      notification.success({ message: "퀴즈 생성에 성공했습니다." });
    },
    onError: () => notification.error({ message: "퀴즈 생성에 실패했습니다." }),
  });

  return (
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
  );
}
