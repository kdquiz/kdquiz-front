import { Button as B, ButtonProps } from "@chakra-ui/react";

export default function Button({ ...props }: ButtonProps) {
  return (
    <B
      transition={"0.25s"}
      borderRadius={0}
      bg={"white"}
      _hover={{
        boxShadow: "inset 2px 2px 2px #646363, 0px 0px 0px #646363",
      }}
      _active={{
        boxShadow: "inset 5px 5px 2px #646363, 0px 0px 0px #646363",
      }}
      {...props}
    />
  );
}
