import Container from "@/components/layout/Container.tsx";
import { Text, Center, Flex } from "@chakra-ui/react";
import { Input } from "antd";
import Button from "@/components/Button.tsx";
import { Controller, useForm } from "react-hook-form";

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Container>
      <Center w={"380px"} h={"620px"} flexDir={"column"} gap={6}>
        <Text fontSize={"3xl"} color={"mainText"}>
          회원가입
        </Text>
        <form onSubmit={handleSubmit(() => {})}>
          <Flex flexDir={"column"} gap={1}>
            <Text fontSize={"2xl"} color={"mainText"}>
              이메일
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={"example@kdquiz.com"}
                    style={{ width: "180px" }}
                    onChange={() => errors.email}
                  />
                )}
                name={"email"}
                control={control}
              />
              <Button
                border={"2px"}
                borderColor={"primary"}
                w={"90px"}
                borderRadius={"6px"}
                color={"primary"}
              >
                코드 발송
              </Button>
            </Flex>
            <Center transition={"0.25s"} h={"30px"}>
              {errors.email && (
                <Text color={"error"} fontSize={"xs"}>
                  이메일을 다시 입력해주세요
                </Text>
              )}
            </Center>
          </Flex>
          <Flex flexDir={"column"}>
            <Text fontSize={"2xl"} color={"mainText"}>
              인증코드
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Flex w={"180px"} gap={0}>
                    <Input
                      {...field}
                      placeholder={"00000"}
                      onChange={() => errors.code}
                      style={{
                        borderRight: 0,
                        borderRadius: "6px 0 0 6px",
                      }}
                      maxLength={6}
                    />
                    <Center
                      borderRadius={"0 6px 6px 0"}
                      color={"white"}
                      bg={"primary"}
                      w={"100px"}
                      border={"1px mainText"}
                    >
                      5 : 00
                    </Center>
                  </Flex>
                )}
                name={"code"}
                control={control}
              />
              <Button
                border={"2px"}
                borderColor={"primary"}
                w={"90px"}
                borderRadius={"6px"}
                color={"primary"}
              >
                인증하기
              </Button>
            </Flex>
            <Center transition={"0.25s"} h={"30px"}>
              {errors.code && (
                <Text color={"error"}>코드를 다시 입력해주세요</Text>
              )}
            </Center>
          </Flex>
          <Flex flexDir={"column"}>
            <Text fontSize={"2xl"} color={"mainText"}>
              비밀번호
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    onChange={() => errors.pw}
                    style={{ width: "274px" }}
                  />
                )}
                name={"code"}
                control={control}
              />
            </Flex>
            <Center transition={"0.25s"} h={"30px"}>
              {errors.pw && (
                <Text color={"error"}>비밀번호를 다시 입력해주세요</Text>
              )}
            </Center>
          </Flex>
          <Flex flexDir={"column"}>
            <Text fontSize={"2xl"} color={"mainText"}>
              비밀번호 확인
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    onChange={() => errors.pw}
                    style={{ width: "274px" }}
                  />
                )}
                name={"code"}
                control={control}
              />
            </Flex>
            <Center transition={"0.25s"} h={"30px"}>
              {errors.pw && (
                <Text color={"error"}>비밀번호가 일치하지 않습니다.</Text>
              )}
            </Center>
          </Flex>
        </form>
        <Button
          w={"160px"}
          fontSize={"xl"}
          h={"40px"}
          borderRadius={"6px"}
          bg={"primary"}
          color={"white"}
        >
          회원가입
        </Button>
      </Center>
    </Container>
  );
}
