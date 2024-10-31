import { Center, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "@/components/Error.tsx";
import { useEffect, useReducer, useRef, useState } from "react";
import { Question } from "@/interface/Question.ts";
import { MultipleChoicePanel } from "@/pages/play/MultipleChoicePanel.tsx";
import { ScoreTimerPanel } from "@/pages/play/ScoreTimerPanel.tsx";
import { QuestionPanel } from "@/pages/play/QuestionPanel.tsx";
import { CommentaryPanel } from "@/pages/play/CommentaryPanel.tsx";
import { SubjectPanel } from "@/pages/play/SubjectPanel.tsx";
import { HintButton } from "@/pages/play/HintButton.tsx";

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
  const [viewComment, setViewComment] = useState<
    "correct" | "incorrect" | "timeout" | null
  >(null);

  const [viewHint, setViewHint] = useReducer((prev) => !prev, false);

  const id = Number(searchParams.get("id"));
  const userId = Number(searchParams.get("user-id"));
  const page = Number(searchParams.get("page"));

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    data[page < data.length ? page : 0],
  );

  const [sec, setSec] = useState<number>(
    data[page < data.length ? page : 0].options.time,
  );
  const time = useRef<number>(data[page < data.length ? page : 0].options.time);
  const timerId = useRef<number>();

  const { mutate } = useMutation({
    mutationKey: ["FixRanking"],
    mutationFn: async () =>
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/game/ranking/put/",
        { playId: userId, score: score },
      ),
    onSuccess: () => navigate(`/result?id=${id}&user-id=${userId}`),
  });

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(time.current);
      time.current -= 1;
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  const stopTimer = () => {
    clearInterval(timerId.current);
  };

  const startTimer = (sec: number) => {
    time.current = sec;
    timerId.current = setInterval(() => {
      setSec(time.current);
      time.current -= 1;
    }, 1000);
  };

  const onClick = (value: boolean) => {
    setViewComment(value ? "correct" : "incorrect");
    viewHint && setViewHint();
    stopTimer();
    if (!value) return;
    setScore(
      score +
        Math.floor(
          (currentQuestion.options.score * sec) / currentQuestion.options.time,
        ),
    );
  };

  const onClickNext = () => {
    setViewComment(null);
    searchParams.set("page", String(page + 1));
    setSearchParams(searchParams);
    if (page + 1 === data.length) {
      mutate();
      return;
    }
    startTimer(data[page + 1].options.time);
    setSec(data[page + 1].options.time);
    setCurrentQuestion(data[page + 1]);
  };

  useEffect(() => {
    if (sec >= 0 || page >= data.length) {
      return;
    }
    setViewComment("incorrect");
    stopTimer();

    return clearInterval(timerId.current);
  }, [data, page, searchParams, setSearchParams, sec]);

  return (
    <VStack h={"100dvh"} justify={"center"} position={"relative"} w={"100%"}>
      {page < data.length && (
        <>
          <ScoreTimerPanel seconds={sec} score={score} />
          <HintButton
            setViewHint={setViewHint}
            currentQuestion={currentQuestion}
            seconds={sec}
            viewHint={viewHint}
          />
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
                  onClick={onClick}
                />
              ) : (
                <SubjectPanel
                  onClick={onClick}
                  correctAnswer={currentQuestion.shortAnswer}
                />
              )}
            </Center>
          </VStack>
        </>
      )}
      <CommentaryPanel
        viewComment={viewComment}
        currentQuestion={currentQuestion}
        onClickNext={onClickNext}
      />
    </VStack>
  );
}
