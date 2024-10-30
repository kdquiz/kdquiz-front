import Button from "@/components/Button.tsx";
import { Question } from "@/interface/Question.ts";
import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export function HintButton({
  seconds,
  currentQuestion,
  viewHint,
  setViewHint,
}: {
  seconds: number;
  currentQuestion: Question;
  viewHint: boolean;
  setViewHint: () => void;
}) {
  return (
    <>
      {currentQuestion.options.useHint && (
        <Button
          borderRadius={"12px"}
          bg={"primary"}
          border={"2px"}
          borderColor={"primary"}
          boxShadow={"2px 2px 2px #646363"}
          p={5}
          gap={2}
          position={"absolute"}
          top={"18px"}
          right={"6px"}
          disabled={seconds > currentQuestion.options.hintTime}
          onClick={setViewHint}
        >
          <Text color={"white"} fontSize={"3xl"}>
            힌트
          </Text>
        </Button>
      )}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={viewHint ? { opacity: 0.9 } : {}}
        style={{
          background: "white",
          position: "absolute",
          top: "78px",
          right: "12px",
          zIndex: 5,
          width: "90%",
          padding: "10px",
          borderRadius: "12px",
          boxShadow: "2px 2px 2px #646363",
        }}
      >
        <Text fontSize={"2xl"}>{currentQuestion.options.hintContent}</Text>
      </motion.div>
    </>
  );
}
