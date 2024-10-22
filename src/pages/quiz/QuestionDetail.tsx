import { Box, Center, Flex, Grid, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ChoiceItem } from "@/pages/quiz/Choice/ChoiceItem.tsx";
import { Skeleton, Spin } from "antd";
import { ChoiceAddButton } from "@/pages/quiz/ChoiceAddButton.tsx";
import { QuestionTitle } from "@/pages/quiz/QuestionTitle.tsx";
import { useEffect, useState } from "react";
import { Choice } from "@/interface/Question.ts";
import { QuestionSubjectInput } from "@/pages/quiz/QuestionSubjectInput.tsx";
import Error from "@/components/Error.tsx";

export function QuestionDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [type, setType] = useState();

  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["quizDetail"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((value) => {
          setType(value.data.data.type);
          return value.data.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isPending) return <Spin />;

  if (isError) return <Error />;

  return (
    data && (
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
          {data ? (
            [
              <Grid
                w={"100%"}
                gap={5}
                gridTemplateColumns={["repeat(1, 1fr)", null, "repeat(2, 1fr)"]}
              >
                {data.choices.map((v: Choice, index: number) => (
                  <ChoiceItem
                    {...v}
                    index={index}
                    key={v.id}
                    unCorrectAble={
                      data.choices.filter((v: Choice) => v.isCorrect).length ===
                      1
                    }
                    deleteAble={data.choices.length !== 1}
                  />
                ))}
                <Center>
                  {data && data.choices.length < 8 && (
                    <ChoiceAddButton questionId={Number(id)} />
                  )}
                </Center>
              </Grid>,
              <Flex
                border={"white"}
                bg={"white"}
                w={"100%"}
                borderRadius={"24px"}
                boxShadow={[0, null, "2px 2px 2px #646363"]}
              >
                <QuestionSubjectInput
                  id={Number(id)}
                  data={data}
                  key={data.id}
                />
              </Flex>,
            ][type]
          ) : (
            <Skeleton />
          )}
        </Center>
      </Box>
    )
  );
}
