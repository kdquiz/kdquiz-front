import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";
import { Center, Flex, Image, Input } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export function QuestionDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, isError } = useQuery("quizDetail", () =>
    axios.get(import.meta.env.VITE_API_URL + "/api/v1/question/" + id, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }),
  );

  return (
    <Center
      bgImage={"/images/play-bg.png"}
      w={"100%"}
      h={"100%"}
      bgSize={"cover"}
      bgPosition={"center"}
    >
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        data && (
          <Center
            p={6}
            w={"100%"}
            h={"100%"}
            flexDir={"column"}
            gap={10}
            maxW={["700px", null, null, "800px", "900px"]}
          >
            <Flex
              border={"white"}
              bg={"white"}
              w={"100%"}
              borderRadius={"24px"}
              boxShadow={[0, null, "2px 2px 2px #646363"]}
            >
              <Input
                defaultValue={data.data.data.content}
                fontSize={"5xl"}
                color={"mainText"}
                textAlign={"center"}
                w={"100%"}
                h={"100px"}
                borderRadius={"24px"}
              />
            </Flex>
            <Image src={"/images/img.png"} w={"80%"} />
            <Flex
              w={"100%"}
              flexWrap={"wrap"}
              justify={"space-between"}
              rowGap={5}
            >
              {data.data.data.choices.map((v: any, index: number) => (
                <Center
                  borderRadius={"24px"}
                  bg={"buttonBg" + (index + 1)}
                  w={"49%"}
                  h={"100px"}
                  boxShadow={[0, null, "-4px 4px 4px #646363"]}
                  position={"relative"}
                >
                  <Input
                    borderRadius={"24px"}
                    defaultValue={v.content}
                    color={"mainText"}
                    border={"none"}
                    fontSize={"6xl"}
                    textAlign={"center"}
                    h={"100%"}
                    maxLength={8}
                  />
                  <Flex position={"absolute"} right={2} gap={2}>
                    <Center cursor={"pointer"} onClick={() => {}}>
                      <FaCheckCircle
                        fontSize={"36px"}
                        color={v.isCorrect ? "#FFFFFF" : "#646363"}
                      />
                    </Center>
                    <Center
                      onClick={() => {
                        // data.data.data.questions[number].choices.splice(
                        //   index,
                        //   1,
                        // );
                        // // mutate({...data, data.data.data.questions[number].choices : data.data.data.questions[number].choices});
                        // console.log(
                        //   data.data.data.questions[number].choices,
                        // );
                        // console.log({ ...data.data.data, questions });
                      }}
                      cursor={"pointer"}
                    >
                      <FaTrashAlt fontSize={"36px"} color={"#646363"} />
                    </Center>
                  </Flex>
                </Center>
              ))}
            </Flex>
          </Center>
        )
      )}
    </Center>
  );
}
