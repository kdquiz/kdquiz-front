import { Box, Center, Flex, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ChoiceItem } from "@/pages/quiz/Choice/ChoiceItem.tsx";
import { Spin } from "antd";
import { ChoiceAddButton } from "@/pages/quiz/ChoiceAddButton.tsx";
import { QuestionTitle } from "@/pages/quiz/QuestionTitle.tsx";
import { Choice } from "@/interface/Question.ts";
import { QuestionSubjectInput } from "@/pages/quiz/QuestionSubjectInput.tsx";
import Error from "@/components/Error.tsx";
import { QuestionDetailImage } from "@/pages/quiz/QuestionDetailImage.tsx";
import { motion } from "framer-motion";

export function QuestionDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isPending, isError } = useQuery({
    queryKey: ["quizDetail", id],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((value) => {
          return value.data.data;
        }),
  });

  console.log(id);

  return (
    <Box
      bgImage={"/images/play-bg.png"}
      h={"100%"}
      bgSize={"cover"}
      bgPosition={"center"}
      overflowY={"scroll"}
    >
      {isPending ? (
        <Spin />
      ) : isError ? (
        <Error />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          key={id}
        >
          <Center
            mx={"auto"}
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
              mt={"20px"}
              borderRadius={"24px"}
              boxShadow={[0, null, "2px 2px 2px #646363"]}
            >
              <QuestionTitle id={Number(id)} data={data} key={data.id} />
            </Flex>
            <QuestionDetailImage
              image={data.fileUrl ?? undefined}
              data={data}
              id={id}
            />
            {
              [
                <Grid
                  w={"100%"}
                  gap={5}
                  h={"30%"}
                  gridTemplateColumns={[
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ]}
                >
                  {data.choices.map((v: Choice, index: number) => (
                    <ChoiceItem
                      {...v}
                      index={index}
                      key={v.id}
                      unCorrectAble={
                        data.choices.filter((v: Choice) => v.isCorrect)
                          .length === 1
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
              ][data.type]
            }
          </Center>
        </motion.div>
      )}
    </Box>
  );
}
