import { Center, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Error from "@/components/Error.tsx";
import { useEffect, useState } from "react";
import { Question } from "@/interface/Question.ts";
import { MultipleChoicePanel } from "@/pages/play/MultipleChoicePanel.tsx";
import { Timer } from "@/pages/play/Timer.tsx";
import { Score } from "@/pages/play/Score.tsx";
import { QuestionPanel } from "@/pages/play/QuestionPanel.tsx";

export default function PlayPage() {
  const [searchParams] = useSearchParams();

  const id = Number(searchParams.get("id"));

  const { data, isPending, isError } = useQuery({
    queryKey: ["gameDetail", id],
    queryFn: async () =>
      axios(import.meta.env.VITE_API_URL + "/api/v1/game/gameQuiz/" + id).then(
        (value) => value.data.data,
      ),
  });

  if (isPending)
    return (
      <Center w={"100%"}>
        <Spin />
      </Center>
    );

  if (isError) return <Error />;

  return <GameInner data={data.questions} />;
}

function GameInner({ data }: { data: Question[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [score, setScore] = useState(0);

  const id = Number(searchParams.get("id"));
  const userId = Number(searchParams.get("user-id"));
  const page = Number(searchParams.get("page"));

  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(
    data[page] ? data[page].options.time * INTERVAL : -1,
  );
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  const [currentQuestion, setCurrentQuestion] = useState<Question>(data[page]);

  const onCorrect = () => {
    setScore(
      score +
        Math.floor(
          (currentQuestion.options.score * (timeLeft / INTERVAL)) /
            currentQuestion.options.time,
        ),
    );
  };

  useEffect(() => {
    if (page === data.length || !data[page]) return;

    const timer = setInterval(() => {
      if (timeLeft < -1) {
        clearInterval(timer);
        return;
      }
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      searchParams.set("page", String(page + 1));
      setSearchParams(searchParams);
      if (page + 1 === data.length) return;
      setTimeLeft(data[page + 1] ? data[page + 1].options.time * INTERVAL : -1);
      setCurrentQuestion(data[page + 1]);
    }

    return () => {
      clearInterval(timer);
    };
  }, [data, page, searchParams, setSearchParams, timeLeft]);

  return (
    <VStack h={"100vh"} justify={"center"} position={"relative"} w={"100%"}>
      {page < data.length && (
        <>
          {Number(seconds) > -1 && <Timer seconds={seconds} />}
          <Score score={score} />
          <VStack
            w={"100%"}
            p={"6px"}
            overflow={"hidden"}
            h={"100%"}
            pt={"84px"}
            justify={"space-between"}
          >
            <QuestionPanel currentQuestion={currentQuestion} />
            <Center w={"100%"} h={"50%"}>
              {currentQuestion.type === 0 ? (
                <MultipleChoicePanel
                  choices={currentQuestion.choices}
                  onClick={onCorrect}
                />
              ) : (
                <></>
              )}
            </Center>
          </VStack>
        </>
      )}
    </VStack>
  );
}
