import Container from "@/components/layout/Container.tsx";
import { Text, Center, Flex, Input } from "@chakra-ui/react";
import Button from "@/components/Button.tsx";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { notification } from "antd";

export default function SignupPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: emailRegister,
    control: emailControl,
    handleSubmit: emailHandleSubmit,
    formState: { errors: emailErrors },
  } = useForm();

  const {
    register: codeRegister,
    control: codeControl,
    handleSubmit: codeHandleSubmit,
    formState: { errors: codeErrors },
  } = useForm();

  const [email, setEmail] = useState<string>("");

  const [emailSendCheck, setEmailSendCheck] = useState<boolean>(false);

  const [emailCheck, setEmailCheck] = useState<boolean>(false);

  return (
    <Container>
      <Center
        w={["300px", null, "450px"]}
        h={["500px", null, "620px"]}
        flexDir={"column"}
      >
        <Text fontSize={["2xl", null, "3xl"]} color={"mainText"} mb={2}>
          회원가입
        </Text>
        <Flex flexDir={"column"} gap={1}>
          <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
            이메일
          </Text>
          <form
            onSubmit={emailHandleSubmit((data) => {
              axios
                .post("http://3.39.104.241:8080" + "/api/v1/mailSend", {
                  email: data.email,
                })
                .then(() => {
                  notification.success({
                    message: "인증번호가 발송 되었습니다.",
                  });
                  setEmail(data.email);
                  setEmailSendCheck(true);
                })
                .catch((e) => {
                  notification.error({
                    message: "인증번호 발송에 실패했습니다.",
                  });
                  console.log(e);
                });
            })}
          >
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input
                    disabled={emailCheck}
                    px={2}
                    {...field}
                    {...emailRegister("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                    })}
                    placeholder={"example@kdquiz.com"}
                    w={"210px"}
                    onChange={() => errors.email}
                    fontSize={["sm", null, "md"]}
                  />
                )}
                name={"email"}
                control={emailControl}
              />
              <Button
                border={"2px"}
                borderColor={"primary"}
                w={["60px", null, "80px"]}
                borderRadius={"6px"}
                fontSize={["sm", null, "md"]}
                color={"primary"}
                type={"submit"}
                onClick={() => {
                  if (emailCheck && email) {
                    setEmailSendCheck(false);
                    setEmailCheck(false);
                  }
                }}
              >
                {emailCheck
                  ? "재입력"
                  : emailSendCheck
                    ? "재발송"
                    : "코드 발송"}
              </Button>
            </Flex>
          </form>
          <Flex h={["20px", null, "30px"]} ml={2}>
            <Text color={"error"} fontSize={["2xs", null, "xs"]}>
              {emailErrors.email?.type === "required" &&
                "이메일을 입력해주세요"}
              {emailErrors.email?.type === "pattern" &&
                "이메일 형식이 올바르지 않습니다."}
            </Text>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
            인증코드
          </Text>
          <form
            onSubmit={codeHandleSubmit((data) => {
              axios
                .post("http://3.39.104.241:8080" + "/api/v1/mailAuthCheck", {
                  email: email,
                  code: data.code,
                })
                .then(() => {
                  notification.success({
                    message: "인증되었습니다.",
                  });
                  setEmailCheck(true);
                })
                .catch((e) => {
                  notification.error({
                    message: "인증 실패했습니다.",
                  });
                  console.log(e);
                });
            })}
          >
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Flex w={"210px"} gap={0}>
                    <Input
                      px={2}
                      {...field}
                      {...codeRegister("code", { required: true })}
                      disabled={emailCheck}
                      fontSize={["sm", null, "md"]}
                      placeholder={"00000"}
                      onChange={() => errors.code}
                      borderRight={0}
                      borderRadius={"6px 0 0 6px"}
                      maxLength={6}
                    />
                    <Center
                      borderRadius={"0 6px 6px 0"}
                      color={"white"}
                      bg={"primary"}
                      w={"100px"}
                      border={"1px mainText"}
                      fontSize={["sm", null, "md"]}
                    >
                      5 : 00
                    </Center>
                  </Flex>
                )}
                name={"code"}
                control={codeControl}
              />
              <Button
                disabled={emailCheck}
                type={"submit"}
                border={"2px"}
                borderColor={"primary"}
                w={["60px", null, "80px"]}
                borderRadius={"6px"}
                fontSize={["sm", null, "md"]}
                color={"primary"}
              >
                인증하기
              </Button>
            </Flex>
          </form>
          <Flex transition={"0.25s"} h={["20px", null, "30px"]} ml={2}>
            {errors.code && (
              <Text color={"error"} fontSize={["2xs", null, "xs"]}>
                코드를 다시 입력해주세요
              </Text>
            )}
          </Flex>
        </Flex>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Flex flexDir={"column"}>
            <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
              비밀번호
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input
                    px={2}
                    {...field}
                    type={"password"}
                    fontSize={["sm", null, "md"]}
                    onChange={() => errors.pw}
                    w={["270px", null, "300px"]}
                  />
                )}
                name={"pw"}
                control={control}
              />
            </Flex>
            <Flex transition={"0.25s"} h={["20px", null, "30px"]} ml={2}>
              {errors.pw && (
                <Text color={"error"} fontSize={["2xs", null, "xs"]}>
                  비밀번호를 다시 입력해주세요
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex flexDir={"column"}>
            <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
              비밀번호 확인
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input
                    px={2}
                    {...field}
                    type={"password"}
                    fontSize={["sm", null, "md"]}
                    onChange={() => errors.pwConfirm}
                    w={["270px", null, "300px"]}
                  />
                )}
                name={"pwConfirm"}
                control={control}
              />
            </Flex>
            <Flex transition={"0.25s"} h={["20px", null, "30px"]} ml={2}>
              {errors.pwConfirm && (
                <Text color={"error"} fontSize={["2xs", null, "xs"]}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              )}
            </Flex>
          </Flex>
          <Center>
            <Button
              type="submit"
              w={"160px"}
              fontSize={["md", null, "xl"]}
              h={["30px", null, "40px"]}
              borderRadius={"6px"}
              bg={"primary"}
              color={"white"}
            >
              가입하기!
            </Button>
          </Center>
        </form>
      </Center>
    </Container>
  );
}