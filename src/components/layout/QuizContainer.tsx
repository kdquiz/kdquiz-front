import { Center, CenterProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export function QuizContainer({
  children,
  ...props
}: {
  children: ReactNode;
} & CenterProps) {
  return (
    <Center
      flexDir={"column"}
      backgroundColor={"primary"}
      p={["18px", null, "24px"]}
      borderRadius={"12px"}
      boxShadow={"2px 2px 2px #646363"}
      position={"relative"}
      {...props}
    >
      <Flex
        w={"100%"}
        justify={"space-between"}
        position={"absolute"}
        top={["6px", null, "12px"]}
        px={["6px", null, "12px"]}
      >
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"2px 2px 2px #646363"}
        />
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"2px 2px 2px #646363"}
        />
      </Flex>
      <Center
        backgroundColor={"white"}
        mx={"12px"}
        w={"100%"}
        borderRadius={"12px"}
        boxShadow={"2px 2px 2px #646363"}
        overflow={"hidden"}
        h={"100%"}
      >
        {children}
      </Center>
      <Flex
        w={"100%"}
        justify={"space-between"}
        position={"absolute"}
        bottom={["6px", null, "12px"]}
        px={["6px", null, "12px"]}
      >
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"2px 2px 2px #646363"}
        />
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"2px 2px 2px #646363"}
        />
      </Flex>
    </Center>
  );
}
