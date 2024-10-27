import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Center, Flex, Text } from "@chakra-ui/react";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Quiz } from "@/interface/Quiz.ts";
import Button from "@/components/Button.tsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QuizItem } from "@/components/quizList/QuizItem.tsx";
import { QuizTitleModal } from "@/components/quizList/QuizTitleModal.tsx";
import { QuizFilter } from "@/components/quizList/QuizFilter.tsx";
import { QuizSearch } from "@/components/quizList/QuizSearch.tsx";
import { QuizPagination } from "./QuizPagination";

export function QuizList({ type = "my" }: { type?: "play" | "my" }) {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "Time_desc";
  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "0";

  const { data, isPending, isError } = useQuery({
    queryKey: ["quizList", page],
    queryFn: () =>
      axios
        .get(
          import.meta.env.VITE_API_URL +
            (type === "my" ? "/api/v1/quiz/" : "/api/v1/game/list/"),
          {
            params:
              type === "my"
                ? {
                    SortBy: sort,
                    searchTitle: search,
                  }
                : {
                    page: Number(page) + 1,
                    size: 10,
                  },
            headers:
              type === "my"
                ? {
                    Authorization: localStorage.getItem("Authorization"),
                  }
                : {},
          },
        )
        .then((value) => value.data),
    enabled: !!page,
  });

  console.log(data);

  const [selectId, setSelectId] = useState<number | boolean>();

  if (isPending) return <Loading />;
  if (isError || data.code === "Q202") return <Error />;
  return (
    <>
      {type === "my" && (
        <Flex
          m={[0, null, null, 5]}
          justify={"flex-end"}
          flexDir={["column", null, "row"]}
          alignItems={"flex-end"}
          gap={[2, null, 4]}
          w={"100%"}
        >
          <QuizFilter />
          <QuizSearch />
        </Flex>
      )}
      <Center flexDir={"column"} gap={4} w={"100%"}>
        {data.code === "Q102" ? (
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
        ) : type === "my" ? (
          data.data.map((v: Quiz) => (
            <QuizItem {...v} setSelectId={setSelectId} key={v.id} type={type} />
          ))
        ) : (
          data.dtoList.map((v: Quiz) => (
            <QuizItem {...v} setSelectId={setSelectId} key={v.id} type={type} />
          ))
        )}
        {type === "my" && (
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
        )}
      </Center>
      {type === "my" ? (
        <QuizTitleModal setSelectId={setSelectId} selectId={selectId} />
      ) : (
        <QuizPagination dataLength={data.totalCount} />
      )}
    </>
  );
}
