import { Center, Flex, Image, Link } from "@chakra-ui/react";
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
    <Flex
      w={"100%"}
      h={["36px", null, "72px"]}
      justify={"space-between"}
      position={"absolute"}
      boxShadow={"-2px 2px 2px #646363"}
      bg={"white"}
      top={0}
    >
      <Link href={"/"}>
        <Image src={"/images/main-logo.svg"} h={"100%"} />
      </Link>
      <Center h={"100%"}>
        <Link
          href={email ? "/my" : "/signup"}
          style={{ height: "100%", textDecoration: "none" }}
        >
          <Button
            w={email ? "auto" : ["86px", null, "172px"]}
            bg={"subMain"}
            fontSize={email ? ["xs", "md", "2xl"] : ["md", null, "2xl"]}
            color={"mainText"}
            fontWeight={"800"}
            h={"100%"}
            cursor={"pointer"}
          >
            {email ? email : "회원가입"}
          </Button>
        </Link>
        {email ? (
          <Button
            w={["86px", null, "172px"]}
            bg={"primary"}
            fontSize={["md", null, "2xl"]}
            color={"subText"}
            fontWeight={"700"}
            h={"100%"}
            onClick={logout}
          >
            로그아웃
          </Button>
        ) : (
          <Link
            href={"/login"}
            style={{ height: "100%", textDecoration: "none" }}
          >
            <Button
              w={["86px", null, "172px"]}
              bg={"primary"}
              fontSize={["md", null, "2xl"]}
              color={"subText"}
              fontWeight={"700"}
              h={"100%"}
            >
              로그인
            </Button>
          </Link>
        )}
      </Center>
    </Flex>
  );
}
