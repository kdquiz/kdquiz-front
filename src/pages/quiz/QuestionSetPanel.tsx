import { Box, Checkbox, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Button from "@/components/Button.tsx";
import { QuestionTypeSelect } from "@/pages/quiz/QuestionTypeSelect.tsx";
import { Spin } from "antd";

export function QuestionSetPanel() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const client = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizDetail"],
    queryFn: async () =>
      await axios
        .get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((value) => value.data),
  });

  const { mutate } = useMutation({
    mutationFn: async (value: any) => {
      return await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/" + id,
        {
          ...data,
          ...value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["quizDetail"] });
    },
  });

  const { handleSubmit, register } = useForm({
    defaultValues: { ...data },
  });

  if (isLoading || isError) return null;
  console.log(data);

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {data ? (
        <Box
          w={"300px"}
          bg={"whitesmoke"}
          h={"100%"}
          p={5}
          pos={"absolute"}
          right={0}
          top={0}
          overflowY={"scroll"}
        >
          <Flex gap={4} flexDir={"column"}>
            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={"2xl"} color={"mainText"}>
                퀴즈 유형
              </Text>
              <QuestionTypeSelect id={Number(id)} data={data} />
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={"2xl"} color={"mainText"}>
                제한 시간
              </Text>
              <Input
                key={data.id}
                type={"number"}
                {...register("options.time", {
                  required: "제한 시간을 입력해주세요",
                })}
                defaultValue={data.options.time}
                fontSize={"2xl"}
                color={"mainText"}
                w={"100%"}
                textAlign={"end"}
              />
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={"2xl"} color={"mainText"}>
                배점
              </Text>
              <Input
                key={data.id}
                type={"number"}
                {...register("options.score", {
                  required: "점수를 입력해주세요",
                })}
                defaultValue={data.options.score}
                fontSize={"2xl"}
                color={"mainText"}
                w={"100%"}
                textAlign={"end"}
              />
            </Flex>
            <Flex gap={2} justify={"space-between"}>
              <Text fontSize={"2xl"} color={"mainText"}>
                힌트 사용
              </Text>
              <Checkbox
                key={data.id}
                color={"primary"}
                size={"lg"}
                defaultValue={data.options.useHint}
                {...register("options.useHint")}
              />
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={"2xl"} color={"mainText"}>
                힌트 제공 시간
              </Text>
              <Input
                key={data.id}
                type={"number"}
                {...register("options.hintTime")}
                defaultValue={data.options.hintTime}
                fontSize={"2xl"}
                color={"mainText"}
                w={"100%"}
                textAlign={"end"}
              />
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={"2xl"} color={"mainText"}>
                힌트 내용
              </Text>
              <Textarea
                key={data.id}
                defaultValue={data.options.hintContent}
                {...register("options.hintContent")}
                fontSize={"2xl"}
                w={"100%"}
                color={"mainText"}
              />
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Text fontSize={"2xl"} color={"mainText"}>
                해설
              </Text>
              <Textarea
                key={data.id}
                defaultValue={data.options.commentary}
                {...register("options.commentary")}
                fontSize={"2xl"}
                color={"mainText"}
                w={"100%"}
              />
            </Flex>
            <Button type={"submit"} bg={"primary"}>
              <Text color={"white"}>저장</Text>
            </Button>
          </Flex>
        </Box>
      ) : (
        <Spin />
      )}
    </form>
  );
}
