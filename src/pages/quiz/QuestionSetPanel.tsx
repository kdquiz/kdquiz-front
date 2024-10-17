import {
  Box,
  Checkbox,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function QuestionSetPanel() {
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get("id");

  // const { control: questionSetControl, handleSubmit } = useForm();

  // const { data, refetch } = useQuery("quizDetail", () =>
  //   axios
  //     .get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
  //       headers: {
  //         Authorization: localStorage.getItem("Authorization"),
  //       },
  //     })
  //     .then((value) => value.data),
  // );

  return (
    // <Form control={questionSetControl}>
    <Box
      w={"300px"}
      bg={"white"}
      h={"100%"}
      p={5}
      pos={"absolute"}
      right={0}
      top={0}
      overflowY={"scroll"}
    >
      <Flex w={"100%"} gap={4} flexDir={"column"}>
        <Flex flexDir={"column"} gap={2}>
          <Text fontSize={"2xl"} color={"mainText"}>
            퀴즈 유형
          </Text>
          <Select defaultValue={0} color={"mainText"} size={"lg"} name={}>
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
    </Box>
    // </Form>
  );
}
