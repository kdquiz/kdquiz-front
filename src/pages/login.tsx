import { Text, Center, Flex, Link, Input } from "@chakra-ui/react";
import Button from "@/components/Button.tsx";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { SignUpInContainer } from "@/components/layout/SignUpInContainer.tsx";

export default function LoginPage() {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <Center w={"100%"}>
      <SignUpInContainer>
        <Center
          w={["300px", null, "380px"]}
          h={["500px", null, "620px"]}
          flexDir={"column"}
          gap={6}
        >
          <Text fontSize={["2xl", null, "3xl"]} color={"mainText"}>
            로그인
          </Text>
          <form
            onSubmit={handleSubmit(async (data) => {
              setLoading(true);
              await axios
                .post(import.meta.env.VITE_API_URL + "/api/v1/users/login", {
                  email: data.email,
                  password: data.pw,
                })
                .then(async (res) => {
                  if (res.data.code === "U003") {
                    console.log(res.data);
                    localStorage.setItem("Authorization", res.data.data);
                    localStorage.setItem("email", data.email);
                    notification.success({
                      message: "로그인 되었습니다.",
                    });
                    navigate("/my");
                    return;
                  }
                  if (res.data.code === "U103") {
                    setError("pw", { type: "notMatch" });
                    return;
                  }
                  if (res.data.code === "000") {
                    setError("email", { type: "notExist" });
                    return;
                  }
                })
                .catch((e) => {
                  console.log(e);
                  if (e.code === "U103") setError("pw", { type: "notMatch" });
                  else
                    notification.error({
                      message: "회원이 존재하지 않습니다.",
                    });
                });
              setLoading(false);
            })}
          >
            <Flex flexDir={"column"} gap={1} maxW={"270px"}>
              <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
                이메일
              </Text>
              <Flex gap={1}>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                      })}
                      placeholder={"example@kdquiz.com"}
                      fontSize={["sm", null, "md"]}
                    />
                  )}
                  name={"email"}
                  control={control}
                />
              </Flex>
              <Flex h={["20px", null, "30px"]} ml={2}>
                <Text color={"error"} fontSize={"xs"}>
                  {errors.email?.type === "required" &&
                    "이메일을 입력해주세요."}
                  {errors.email?.type === "pattern" &&
                    "이메일 형식이 올바르지 않습니다."}
                  {errors.email?.type === "notExist" &&
                    "회원이 존재하지 않습니다."}
                </Text>
              </Flex>
            </Flex>
            <Flex flexDir={"column"}>
              <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
                비밀번호
              </Text>
              <Flex gap={1}>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      {...register("pw", {
                        required: true,
                      })}
                      type={"password"}
                      fontSize={["sm", null, "md"]}
                    />
                  )}
                  name={"code"}
                  control={control}
                />
              </Flex>
              <Flex h={["20px", null, "30px"]} ml={2}>
                <Text color={"error"} fontSize={"xs"}>
                  {errors.pw?.type === "required" && "비밀번호를 입력해주세요."}
                  {errors.pw?.type === "notMatch" &&
                    "비밀번호가 일치하지 않습니다."}
                </Text>
              </Flex>
            </Flex>
            <Center>
              <Button
                w={"100%"}
                fontSize={["md", null, "xl"]}
                h={["30px", null, "40px"]}
                borderRadius={"6px"}
                bg={loading ? "white" : "primary"}
                color={"white"}
                type={"submit"}
                border={"2px"}
                borderColor={"primary"}
              >
                {loading ? <Spin /> : "로그인"}
              </Button>
            </Center>
          </form>
          <Text fontSize={["sm", null, "md"]}>
            계정이 없나요?
            <Link href={"/signup"} color={"blue"}>
              가입!
            </Link>
          </Text>
        </Center>
      </SignUpInContainer>
    </Center>
  );
}
