import { Box, Input, Text, VStack } from "@chakra-ui/react";
import Button from "@/components/Button.tsx";
import { FadeInSlideRightWrapper } from "@/components/layout/FadeInSlideRightWrapper.tsx";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

export function NicknameForm() {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (nickname: string) => {
      axios
        .post(import.meta.env.VITE_API_URL + "/api/v1/game/gameJoin/", {
          quizId: id,
          nickname: nickname,
        })
        .then((res) => {
          navigate(`/play?id=${id}&user-id=${res.data.data.playId}&page=0`);
        });
    },
  });

  return (
    <FadeInSlideRightWrapper delay={0.5}>
      <form onSubmit={handleSubmit(async (v) => mutate(v.nickname))}>
        <VStack maxW="300px">
          <Box bg={"white"} borderRadius={"12px"}>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("nickname", {
                    required: true,
                  })}
                  border={"2px solid"}
                  borderColor={"primary"}
                  color={"mainText"}
                  focusBorderColor={"hoverPrimary"}
                  placeholder={"닉네임"}
                  textAlign={"center"}
                  maxLength={16}
                  borderRadius={"12px"}
                  fontSize={"2xl"}
                />
              )}
              name={"nickname"}
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
            {errors.nickname?.type === "required" && "이메일을 입력해주세요"}
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
            <Text fontSize={"2xl"}>퀴즈 시작!!!</Text>
          </Button>
        </VStack>
      </form>
    </FadeInSlideRightWrapper>
  );
}
