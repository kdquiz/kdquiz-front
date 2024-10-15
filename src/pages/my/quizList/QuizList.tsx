import { useQuery } from "react-query";
import axios from "axios";
import { Center, Flex, Text } from "@chakra-ui/react";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Quiz } from "@/interface/Quiz.ts";
import Button from "@/components/Button.tsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QuizItem } from "@/pages/my/quizList/QuizItem.tsx";
import { QuizTitleModal } from "@/pages/my/quizList/QuizTitleModal.tsx";
import { QuizFilter } from "@/pages/my/quizList/QuizFilter.tsx";
import { QuizSearch } from "@/pages/my/quizList/QuizSearch.tsx";

export function QuizList() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "Time_desc";
  const search = searchParams.get("search") ?? "";

  const { data, isLoading, isSuccess, isError } = useQuery("quizList", () =>
    axios.get(import.meta.env.VITE_API_URL + `/api/v1/quiz/`, {
      params: {
        SortBy: sort,
        searchTitle: search,
      },
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }),
  );

  const [selectId, setSelectId] = useState<number | boolean>();

  if (isLoading) return <Loading />;
  if (isError || data?.data.code === "Q202") return <Error />;
  if (data && isSuccess) {
    return (
      <>
        <Flex
          m={[0, null, 3, 5]}
          justify={"flex-end"}
          flexDir={["column", null, null, "row"]}
          alignItems={"flex-end"}
          gap={[2, null, 4]}
        >
          <QuizFilter />
          <QuizSearch />
        </Flex>
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
              <QuizItem {...v} setSelectId={setSelectId} />
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
        <QuizTitleModal setSelectId={setSelectId} selectId={selectId} />
      </>
    );
  }
}
