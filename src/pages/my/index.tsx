import { Center, Flex, Text, Input } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import Button from "@/components/Button.tsx";
import QuizList from "@/components/QuizList.tsx";

const SORT_LIST = [
  ["Latest", "최신순"],
  ["Earliest", "오래된순"],
  ["Ascending", "오름차순"],
  ["Descending", "내림차순"],
];
export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "Latest";

  return (
    <Center w={"100%"} h={"100%"}>
      <Center
        w={["100%", null, null, "80%", "60%"]}
        h={"100%"}
        boxShadow={["none", null, "0px 4px 12px #646363"]}
      >
        <Flex
          w={"100%"}
          h={"100%"}
          bg={"white"}
          p={[2, null, 5]}
          flexDir={"column"}
          gap={[2, null, 5]}
        >
          <Text fontSize={["xl", null, "2xl", "4xl"]} color={"mainText"}>
            프로젝트 라이브러리
          </Text>
          <Flex
            m={[0, null, 3, 5]}
            justify={"flex-end"}
            flexDir={["column", null, null, "row"]}
            alignItems={"flex-end"}
            gap={[2, null, 4]}
          >
            <Flex
              boxShadow={["none", null, "-4px 4px 4px #646363"]}
              borderRadius={"6px"}
              w={["100%", null, null, "500px"]}
            >
              {SORT_LIST.map((v, index) => (
                <Center
                  w={"25%"}
                  py={3}
                  fontSize={"md"}
                  borderLeftRadius={index === 0 ? "6px" : 0}
                  borderRightRadius={index === 3 ? "6px" : 0}
                  cursor={"pointer"}
                  borderRight={index !== 3 ? 0 : "2px"}
                  borderLeft={index === 0 ? "2px" : 0}
                  borderY={"2px"}
                  onClick={() => {
                    searchParams.set("sort", v[0]);
                    setSearchParams(searchParams);
                  }}
                  transition={"0.25s"}
                  bg={v[0] === sort ? "primary" : "white"}
                  borderColor={"primary"}
                >
                  <Center
                    color={v[0] === sort ? "white" : "mainText"}
                    fontSize={["sm", null, "md"]}
                  >
                    {v[1]}
                  </Center>
                </Center>
              ))}
            </Flex>
            <Center>
              <Center
                boxShadow={["none", null, "-4px 4px 4px #646363"]}
                border="2px"
                borderColor="primary"
                borderRadius="6px"
                h={["40px", null, null, "52px"]}
              >
                <Input
                  border="none"
                  borderRadius="6px"
                  h={"50px"}
                  name="title"
                  placeholder={"프로젝트명"}
                  w="190px"
                  py={3}
                />
                <Button
                  bg="primary"
                  _hover={{ bg: "white" }}
                  border="1px"
                  borderColor="primary"
                  borderRadius="6px"
                  h={["40px", null, null, "52px"]}
                  type="submit"
                  p={0}
                  role="group"
                  w={["40px", null, null, "52px"]}
                >
                  <Center
                    _groupHover={{ color: "primary" }}
                    color="subText"
                    w="100%"
                  >
                    <MdSearch fontSize="24px" />
                  </Center>
                </Button>
              </Center>
            </Center>
          </Flex>
          <QuizList />
        </Flex>
      </Center>
    </Center>
  );
}
