import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Center, Flex, Text } from "@chakra-ui/react";
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
import { Spin } from "antd";
import { motion } from "framer-motion";

const ReviewListVariants = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ReviewItemVariants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 20,
    opacity: 0,
  },
};

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
                    size: 5,
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

  const [selectId, setSelectId] = useState<number | boolean>();

  if (isPending)
    return (
      <Center w={"100%"}>
        <Spin />
      </Center>
    );

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
      <motion.div
        initial="closed"
        variants={ReviewListVariants}
        viewport={{ once: true }}
        whileInView="visible"
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          gap: "20px",
        }}
        key={page}
      >
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
            <motion.div variants={ReviewItemVariants} key={v.id}>
              <QuizItem {...v} setSelectId={setSelectId} type={type} />
            </motion.div>
          ))
        ) : (
          data.dtoList.map((v: Quiz) => (
            <motion.div variants={ReviewItemVariants} key={v.id}>
              <QuizItem {...v} setSelectId={setSelectId} type={type} />
            </motion.div>
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
      </motion.div>
      {type === "my" ? (
        <QuizTitleModal setSelectId={setSelectId} selectId={selectId} />
      ) : (
        <QuizPagination dataLength={data.totalCount} />
      )}
    </>
  );
}
