import { Box, Checkbox, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Button from "@/components/Button.tsx";
import { QuestionTypeSelect } from "@/pages/quiz/QuestionTypeSelect.tsx";
import { Spin } from "antd";
import Error from "@/components/Error.tsx";
import { Question } from "@/interface/Question.ts";
import { motion } from "framer-motion";

export function QuestionSetPanel() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const { data, isPending, isError } = useQuery({
    queryKey: ["quizDetail", id],
    queryFn: async () =>
      await axios
        .get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((value) => value.data.data),
  });

  return (
    <Box
      p={5}
      w={"300px"}
      bg={"whitesmoke"}
      h={"100%"}
      pos={"absolute"}
      right={0}
      top={0}
      overflowY={"scroll"}
      style={{
        scrollbarWidth: "none",
      }}
    >
      {isPending ? (
        <Spin />
      ) : isError ? (
        <Error />
      ) : (
        <QuestionSetPanelInner data={data} key={id} />
      )}
    </Box>
  );
}
function QuestionSetPanelInner({ data }: { data: Question }) {
  const client = useQueryClient();

  const { handleSubmit, register } = useForm({ defaultValues: data });
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
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

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1] }}
        key={id}
      >
        <Flex gap={4} flexDir={"column"} zIndex={5}>
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
              type={"number"}
              {...register("options.time", {
                required: "제한 시간을 입력해주세요",
                value: data?.options.time ?? "",
              })}
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
              type={"number"}
              {...register("options.score", {
                required: "점수를 입력해주세요",
              })}
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
              color={"primary"}
              size={"lg"}
              {...register("options.useHint")}
            />
          </Flex>
          <Flex flexDir={"column"} gap={2}>
            <Text fontSize={"2xl"} color={"mainText"}>
              힌트 제공 시간
            </Text>
            <Input
              type={"number"}
              {...register("options.hintTime")}
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
      </motion.div>
    </form>
  );
}
