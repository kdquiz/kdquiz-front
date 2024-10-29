import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Ranking {
  nickname: string;
  playId: number;
  rank: number;
  score: number;
}

const ReviewListVariants = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ReviewItemVariants = {
  visible: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: 20,
    opacity: 0,
  },
};

export function RankingList({
  data,
  userId,
}: {
  data: Ranking[];
  userId: number;
}) {
  return (
    <motion.div
      initial="closed"
      variants={ReviewListVariants}
      viewport={{ once: true }}
      whileInView="visible"
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "20px",
        padding: "8px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
        overflowX: "hidden",
      }}
      key={userId}
    >
      {data.map(({ rank, nickname, score, playId }) => (
        <motion.div
          variants={ReviewItemVariants}
          key={playId}
          id={String(playId)}
        >
          <Flex
            w={"100%"}
            p={userId === playId ? 2 : 4}
            align={"center"}
            justify={"space-between"}
            bg={"white"}
            borderRadius={"12px"}
            boxShadow={"2px 2px 2px #646363"}
            border={userId === playId ? "8px solid" : undefined}
            borderColor={"primary"}
          >
            <Center boxSize={"50px"}>
              {rank < 4 ? (
                <Image
                  w={"100%"}
                  h={"100%"}
                  objectFit={"contain"}
                  src={
                    "/images/score/" +
                    ["first", "second", "third"][rank - 1] +
                    ".png"
                  }
                />
              ) : (
                <Text fontSize={"xl"}>{rank}등</Text>
              )}
            </Center>
            <Text fontSize={"2xl"}>{nickname}</Text>
            <Text fontSize={"2xl"}>{score}점</Text>
          </Flex>
        </motion.div>
      ))}
    </motion.div>
  );
}
