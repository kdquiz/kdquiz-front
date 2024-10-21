import { Box, Center, Flex, Grid, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ChoiceItem } from "@/pages/quiz/Choice/ChoiceItem.tsx";
import { Skeleton, Spin } from "antd";
import { ChoiceAddButton } from "@/pages/quiz/ChoiceAddButton.tsx";
import { QuestionTitle } from "@/pages/quiz/QuestionTitle.tsx";
import { useEffect } from "react";
import { Choice } from "@/interface/Question.ts";

export function QuestionDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, refetch } = useQuery("quizDetail", () =>
    axios
      .get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((value) => value.data.data),
  );

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  return (
    <Box
      bgImage={"/images/play-bg.png"}
      h={"100%"}
      bgSize={"cover"}
      bgPosition={"center"}
      mx={"300px"}
    >
      <Center
        mx={"auto"}
        p={6}
        w={"100%"}
        h={"100%"}
        flexDir={"column"}
        gap={10}
        maxW={["700px", null, null, "800px", "900px"]}
      >
        <Flex
          border={"white"}
          bg={"white"}
          w={"100%"}
          borderRadius={"24px"}
          boxShadow={[0, null, "2px 2px 2px #646363"]}
        >
          {data ? (
            <QuestionTitle id={Number(id)} data={data} key={data.id} />
          ) : (
            <Spin />
          )}
        </Flex>
        <Image src={"/images/img.png"} w={"80%"} />
        <Grid
          w={"100%"}
          gap={5}
          gridTemplateColumns={["repeat(1, 1fr)", null, "repeat(2, 1fr)"]}
        >
          {data ? (
            data.choices.map((v: Choice, index: number) => (
              <ChoiceItem
                {...v}
                index={index}
                key={v.id}
                deleteAble={data.choices.length !== 1}
              />
            ))
          ) : (
            <Skeleton />
          )}
          <Center>
            {data && data.choices.length < 8 && (
              <ChoiceAddButton questionId={Number(id)} />
            )}
          </Center>
        </Grid>
      </Center>
    </Box>
  );
}
