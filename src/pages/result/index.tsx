import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Center, Text, VStack } from "@chakra-ui/react";
import { Spin } from "antd";
import Error from "@/components/Error.tsx";
import { QuizContainer } from "@/components/layout/QuizContainer.tsx";
import Button from "@/components/Button.tsx";
import { FadeInSlideRightWrapper } from "@/components/layout/FadeInSlideRightWrapper.tsx";
import { RankingList } from "@/pages/result/RankingList.tsx";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("user-id");

  const { data, isPending, isError } = useQuery({
    queryKey: ["RankingList", id],
    queryFn: async () =>
      await axios(
        import.meta.env.VITE_API_URL + "/api/v1/game/ranking/" + id,
      ).then((value) => value.data.data),
  });

  if (isPending)
    return (
      <Center w={"100%"}>
        <Spin />
      </Center>
    );

  if (isError) return <Error />;

  return (
    <VStack w={"100%"} p={5} gap={5} height={"100dvh"}>
      <FadeInSlideRightWrapper>
        <QuizContainer width={"100%"}>
          <Center p={4}>
            <Text fontSize={"4xl"}>퀴즈 종료!!</Text>
          </Center>
        </QuizContainer>
      </FadeInSlideRightWrapper>
      <RankingList data={data} userId={Number(userId)} />
      <Link to={"/participation?id=" + id}>
        <Button
          borderRadius={"12px"}
          bg={"primary"}
          border={"2px"}
          w={"100%"}
          borderColor={"primary"}
          boxShadow={"2px 2px 2px #646363"}
          p={5}
          gap={2}
        >
          <Text color={"white"} fontSize={"2xl"}>
            돌아가기
          </Text>
        </Button>
      </Link>
    </VStack>
  );
}
