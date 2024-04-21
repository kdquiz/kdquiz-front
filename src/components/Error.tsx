import { Center, Image, Text } from "@chakra-ui/react";

export default function Error() {
  return (
    <Center flexDir={"column"}>
      <Image src={"./images/error.svg"} h={"50%"} />
      <Text color={"error"}>ERROR</Text>
    </Center>
  );
}
