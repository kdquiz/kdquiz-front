import { Box, Input, Text, VStack } from "@chakra-ui/react";
import Button from "@/components/Button.tsx";
import { Controller, useForm } from "react-hook-form";

export function SubjectPanel({
  correctAnswer,
  onClick,
}: {
  correctAnswer: string;
  onClick: (value: boolean) => void;
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <VStack>
      <form
        onSubmit={handleSubmit(async (v) => {
          reset();
          onClick(v.answer === correctAnswer);
        })}
      >
        <VStack maxW="300px">
          <Box bg={"white"} borderRadius={"12px"}>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("answer", {
                    required: true,
                  })}
                  border={"2px solid"}
                  borderColor={"primary"}
                  color={"mainText"}
                  focusBorderColor={"hoverPrimary"}
                  placeholder={"정답"}
                  textAlign={"center"}
                  maxLength={16}
                  borderRadius={"12px"}
                  fontSize={"2xl"}
                />
              )}
              name={"answer"}
              control={control}
            />
          </Box>
          <Text
            color={"error"}
            fontSize={"lg"}
            maxH={errors.nickname?.type === "required" ? "30px" : "0px"}
            overflow={"hidden"}
            transition={"0.5s"}
          >
            {errors.nickname?.type === "required" && "정답을 입력해주세요!"}
          </Text>
          <Button
            w={"100%"}
            fontSize={["md", null, "xl"]}
            h={"50px"}
            borderRadius={"12px"}
            bg={"primary"}
            color={"white"}
            type={"submit"}
            border={"2px"}
            borderColor={"primary"}
          >
            <Text fontSize={"2xl"}>확인!</Text>
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}
