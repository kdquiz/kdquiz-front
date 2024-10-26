import { Box, Center, Image, Text } from "@chakra-ui/react";
import { Upload } from "antd";
import { MdOutlineUnarchive } from "react-icons/md";
import axios from "axios";
import { Question } from "@/interface/Question.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";

export function QuestionDetailImage({
  image,
  data,
  id,
}: {
  image?: string;
  data: Question;
  id: string | null;
}) {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (imageUrl: string) =>
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/v1/question/" + id,
        {
          ...data,
          fileUrl: imageUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
      ),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["questionList"] });
      client.invalidateQueries({ queryKey: ["quizDetail"] });
    },
  });

  return (
    <Upload.Dragger
      fileList={[]}
      style={{ position: "relative" }}
      onChange={(file) => {
        if (file.file.originFileObj) {
          const formData = new FormData();
          formData.append("files", file.file.originFileObj);
          return axios
            .post(import.meta.env.VITE_API_URL + "/api/v1/upload", formData, {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
            .then(async (value) => mutate(value.data[0]));
        }
      }}
    >
      <Image
        w={"800px"}
        h={"400px"}
        objectFit={"cover"}
        src={
          image ? import.meta.env.VITE_API_URL + "/" + image : "/images/img.png"
        }
      />
      {image ? (
        <Center
          cursor={"pointer"}
          onClick={() => {}}
          position={"absolute"}
          right={"-50px"}
          bottom={"20px"}
          transition={".25s"}
          _hover={{
            opacity: 0.5,
          }}
        >
          <FaTrashAlt fontSize={"36px"} color={"#646363"} />
        </Center>
      ) : (
        <Box
          w={"100%"}
          h={"100%"}
          bg={"rgba(255,255,255, 0.8)"}
          position={"absolute"}
          top={0}
          left={0}
          borderRadius={"12px"}
          alignContent={"center"}
        >
          <Center flexDir={"column"}>
            <MdOutlineUnarchive fontSize={"60px"} color={"#646363"} />
            <Text fontSize={"2xl"} color={"mainText"}>
              <br />
              드래그 또는 클릭하여 이미지를 업로드해주세요!
            </Text>
          </Center>
        </Box>
      )}
    </Upload.Dragger>
  );
}
