import { useSearchParams } from "react-router-dom";
import { QuizContainer } from "@/components/layout/QuizContainer.tsx";
import { Center, Link, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QRCode, Spin } from "antd";
import Error from "@/components/Error.tsx";
import Button from "@/components/Button.tsx";
import { FadeInSlideRightWrapper } from "@/components/layout/FadeInSlideRightWrapper.tsx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { NicknameForm } from "@/pages/participation/NicknameForm.tsx";

export default function ParticipationPage() {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  const currentHref = window.location.href;

  const { data, isPending, isError } = useQuery({
    queryKey: ["quizDetail", id],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/api/v1/game/gameQuiz/" + id)
        .then((value) => {
          return value.data.data;
        }),
  });

  if (isPending)
    return (
      <Center w={"100%"}>
        <Spin />
      </Center>
    );

  if (isError) return <Error />;

  return (
    <VStack p={"24px"} gap={4}>
      <Link href={"/quiz-list"}>
        <Button
          boxShadow={"2px 2px 2px #646363"}
          borderRadius={"12px"}
          bg={"primary"}
          color={"subText"}
          p={0}
          boxSize={"50px"}
          position={"absolute"}
          top={"12px"}
          left={"12px"}
        >
          <MdKeyboardArrowLeft fontSize={"48px"} />
        </Button>
      </Link>
      <FadeInSlideRightWrapper>
        <QuizContainer w={"100%"}>
          <Center p={"12px"}>
            <Text textAlign={"center"} fontSize={"3xl"} wordBreak={"keep-all"}>
              {data.title}
            </Text>
          </Center>
        </QuizContainer>
      </FadeInSlideRightWrapper>
      <FadeInSlideRightWrapper delay={0.25}>
        <QuizContainer>
          <VStack py={3}>
            <Text fontSize={"md"}>친구와 함께해요!</Text>
            <QRCode type={"canvas"} value={currentHref} />
          </VStack>
        </QuizContainer>
      </FadeInSlideRightWrapper>
      <NicknameForm />
    </VStack>
  );
}
