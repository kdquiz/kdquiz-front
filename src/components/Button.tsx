import { Center, CenterProps } from "@chakra-ui/react";

interface ButtonProps extends CenterProps {}
export default function Button({ ...props }: ButtonProps) {
  return (
    <Center
      transition={"0.25s"}
      cursor={"pointer"}
      _hover={{
        boxShadow: "inset 4px 4px 2px #646363, 0px 0px 0px #646363",
      }}
      boxShadow={"inset 0px 0px 0px #646363, 2px 2px 2px #646363"}
      {...props}
    />
  );
}
