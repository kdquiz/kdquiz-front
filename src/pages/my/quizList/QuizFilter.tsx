import { Center, Flex } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";

const SORT_LIST = [
  ["Time_desc", "최신순"],
  ["Time_asc", "오래된순"],
  ["desc", "오름차순"],
  ["asc", "내림차순"],
];

export function QuizFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "Time_desc";
  const client = useQueryClient();
  return (
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
            client.invalidateQueries({ queryKey: "quizList" });
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
  );
}
