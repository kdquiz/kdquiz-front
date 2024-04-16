import Container from "@/components/layout/Container.tsx";
import { Text, Center, Flex, Link } from "@chakra-ui/react";
import { Input } from "antd";
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
      <Center w={"380px"} h={"620px"} flexDir={"column"} gap={6}>
        <Text fontSize={"3xl"} color={"mainText"}>
          로그인
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
                    style={{ width: "274px" }}
                    onChange={() => errors.email}
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
        </form>
        <Button
          w={"160px"}
          fontSize={"xl"}
          h={"40px"}
          borderRadius={"6px"}
          bg={"primary"}
          color={"white"}
        >
          로그인
        </Button>
        <Text>
          계정이 없나요?
          <Link href={"/signup"} color={"primary"}>
            가입!
          </Link>
        </Text>
      </Center>
    </Container>
  );
}
