import Container from "@/components/layout/Container.tsx";
import { Text, Center, Flex, Link, Input } from "@chakra-ui/react";
import Button from "@/components/Button.tsx";
import { Controller, useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Container>
      <Center
        w={["300px", null, "380px"]}
        h={["500px", null, "620px"]}
        flexDir={"column"}
        gap={6}
      >
        <Text fontSize={["2xl", null, "3xl"]} color={"mainText"}>
          로그인
        </Text>
        <form onSubmit={handleSubmit(() => {})}>
          <Flex flexDir={"column"} gap={1}>
            <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
              이메일
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={"example@kdquiz.com"}
                    w={["auto", null, "274px"]}
                    onChange={() => errors.email}
                    fontSize={["sm", null, "md"]}
                  />
                )}
                name={"email"}
                control={control}
              />
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
            <Text fontSize={["xl", null, "2xl"]} color={"mainText"}>
              비밀번호
            </Text>
            <Flex gap={1}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    type={"password"}
                    onChange={() => errors.pw}
                    maxLength={6}
                    w={["auto", null, "274px"]}
                    fontSize={["sm", null, "md"]}
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
        </form>
        <Button
          w={"160px"}
          fontSize={["md", null, "xl"]}
          h={["30px", null, "40px"]}
          borderRadius={"6px"}
          bg={"primary"}
          color={"white"}
        >
          로그인
        </Button>
        <Text fontSize={["sm", null, "md"]}>
          계정이 없나요?
          <Link href={"/signup"} color={"blue"}>
            가입!
          </Link>
        </Text>
      </Center>
    </Container>
  );
}
