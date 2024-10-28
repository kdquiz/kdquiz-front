import { Center, Grid, Text } from "@chakra-ui/react";
import { Choice } from "@/interface/Question.ts";

export function MultipleChoicePanel({
  choices,
  onClick,
}: {
  choices: Choice[];
  onClick?: () => void;
}) {
  return (
    <Grid w={"100%"} gap={2} gridTemplateColumns={"repeat(2, 1fr)"} h={"100%"}>
      {choices.map((v, i) => (
        <Center
          borderRadius={"24px"}
          bg={"buttonBg" + (i + 1)}
          py={5}
          boxShadow={"2px 2px 2px #646363"}
          position={"relative"}
          onClick={v.isCorrect ? onClick : undefined}
        >
          <Text
            borderRadius={"24px"}
            color={"white"}
            border={"none"}
            fontSize={"3xl"}
            textAlign={"center"}
          >
            {v.content}
          </Text>
        </Center>
      ))}
    </Grid>
  );
}
