import { Box, Center, Flex, Image, Link } from "@chakra-ui/react";
import Button from "../Button";
import { useCallback } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function GNB() {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("Authorization");
    notification.warning({ message: "로그아웃 되었습니다." });
    navigate("/");
  }, [navigate]);

  return (
    <Box
      w={"100%"}
      h={["36px", null, "72px"]}
      position={"fixed"}
      boxShadow={"2px 2px 2px #646363"}
      bg={"white"}
      top={0}
      zIndex={10}
    >
      <Flex w={"100%"} justify={"space-between"} h={"100%"}>
        <Link href={"/"}>
          <Image src={"/images/main-logo.svg"} h={"100%"} />
        </Link>
        <Center h={"100%"}>
          <Link
            href={email ? "/my" : "/signup"}
            style={{ height: "100%", textDecoration: "none" }}
          >
            <Button
              bg={"subMain"}
              minW={[null, null, "156px"]}
              fontSize={email ? ["xs", "md", "2xl"] : ["md", null, "2xl"]}
              color={"mainText"}
              fontWeight={"800"}
              h={"100%"}
              cursor={"pointer"}
              p={3}
            >
              {email ? email : "회원가입"}
            </Button>
          </Link>
          {email ? (
            <Button
              minW={[null, null, "156px"]}
              bg={"primary"}
              fontSize={["md", null, "2xl"]}
              color={"subText"}
              fontWeight={"700"}
              h={"100%"}
              onClick={logout}
              p={3}
            >
              로그아웃
            </Button>
          ) : (
            <Link
              href={"/login"}
              style={{ height: "100%", textDecoration: "none" }}
            >
              <Button
                minW={[null, null, "156px"]}
                bg={"primary"}
                fontSize={["md", null, "2xl"]}
                color={"subText"}
                fontWeight={"700"}
                h={"100%"}
                p={3}
              >
                로그인
              </Button>
            </Link>
          )}
        </Center>
      </Flex>
    </Box>
  );
}
