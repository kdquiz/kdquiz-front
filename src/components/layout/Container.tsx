import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <Center
      flexDir={"column"}
      backgroundColor={"primary"}
      p={"12px"}
      borderRadius={"12px"}
      boxShadow={"-2px 2px 2px #646363"}
    >
      <Flex w={"100%"} justify={"space-between"}>
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"-2px 2px 2px #646363"}
        />
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"-2px 2px 2px #646363"}
        />
      </Flex>
      <Center
        backgroundColor={"white"}
        mx={"12px"}
        borderRadius={"12px"}
        boxShadow={"-2px 2px 2px #646363"}
      >
        {children}
      </Center>
      <Flex w={"100%"} justify={"space-between"}>
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"-2px 2px 2px #646363"}
        />
        <Flex
          w={"12px"}
          h={"12px"}
          borderRadius={"100%"}
          bg={"subMain"}
          boxShadow={"-2px 2px 2px #646363"}
        />
      </Flex>
    </Center>
  );
}
