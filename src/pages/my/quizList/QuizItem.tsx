import { Center, Flex, Image, Link, Text } from "@chakra-ui/react";
import { MdAccessTimeFilled, MdModeEditOutline } from "react-icons/md";
import dayjs from "dayjs";
import { QuizDeleteButton } from "@/components/QuizDeleteButton.tsx";
import Button from "@/components/Button.tsx";
import { Quiz } from "@/interface/Quiz.ts";
import { Dispatch, SetStateAction } from "react";

export function QuizItem({
  id,
  title,
  update_at,
  create_at,
  setSelectId,
}: Quiz & {
  setSelectId: Dispatch<SetStateAction<number | boolean | undefined>>;
}) {
  return (
    <Center
      borderRightRadius={"16px"}
      borderBottomLeftRadius={"16px"}
      bg={"primary"}
      p={"0 16px 16px 0"}
      w={"100%"}
      boxShadow={["none", null, "4px 4px 4px #646363"]}
      _hover={{
        boxShadow: "0px 0px 0px #646363",
      }}
      _active={{
        boxShadow: "inset 2px 2px 2px #646363, 0px 0px 0px #646363",
      }}
      transition={"0.25s"}
    >
      <Flex
        bg={"white"}
        w="100%"
        transition={"0.25s"}
        role={"group"}
        gap={3}
        borderTop={"1px"}
        borderColor={"primary"}
      >
        <Image
          src={"/images/play-bg.png"}
          w={["100px", null, "200px"]}
          objectFit={"cover"}
        />
        <Flex w={"100%"} flexDir={["column", null, "row"]}>
          <Flex
            flexDir={"column"}
            justify={"space-between"}
            m={[1, null, 3]}
            w={"100%"}
          >
            <Link href={"/quiz?quiz-id=" + id}>
              <Text
                fontSize={["md", null, "xl", "3xl"]}
                color={"mainText"}
                _hover={{ textDecoration: "underline" }}
                cursor={"pointer"}
              >
                {title}
              </Text>
            </Link>
            <Flex gap={2} alignItems={"center"}>
              <Center display={["none", null, "flex"]}>
                <MdAccessTimeFilled fontSize={"36px"} color={"#646363"} />
              </Center>
              <Center display={["flex", null, "none"]}>
                <MdAccessTimeFilled fontSize={"24px"} color={"#646363"} />
              </Center>
              <Text fontSize={["sm", null, "md", "2xl"]} color={"mainText"}>
                {dayjs(update_at ?? create_at).format("YYYY-MM-DD HH:mm")}
              </Text>
            </Flex>
          </Flex>
          <Flex
            m={[1, null, 3]}
            flexDir={["row", null, "column"]}
            w={["100%", null, "120px"]}
            justify={["flex-end", null, "space-between"]}
            alignItems={["center", null, "initial"]}
            gap={[2, null, 0]}
            pr={[5, null, 0]}
          >
            <Center justifyContent={"space-between"} gap={[2, null, 0]}>
              <Center cursor={"pointer"} onClick={() => setSelectId(id)}>
                <MdModeEditOutline fontSize={"48px"} color={"#646363"} />
              </Center>
              <QuizDeleteButton
                id={id}
                title={title}
                setSelectId={setSelectId}
              />
            </Center>
            <Button
              color={"white"}
              fontSize={["md", null, "xl", null, "3xl"]}
              bg={"primary"}
              borderRadius={"6px"}
              w={["60px", null, "100px", null, "120px"]}
              h={["30px", null, "50px", null, "60px"]}
            >
              시작!
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}
