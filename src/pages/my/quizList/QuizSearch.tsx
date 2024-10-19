import { Center, Input } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button.tsx";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";

export function QuizSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const client = useQueryClient();

  const { control: searchControl, handleSubmit: searchHandleSubmit } =
    useForm();

  return (
    <Center>
      <form
        onSubmit={searchHandleSubmit(async (data) => {
          await searchParams.set("search", data.title ?? "");
          await setSearchParams(searchParams);
          client.invalidateQueries({ queryKey: "quizList" });
        })}
      >
        <Center
          boxShadow={["none", null, "4px 4px 4px #646363"]}
          border="2px"
          borderColor="primary"
          borderRadius="6px"
          h={["40px", null, null, "52px"]}
        >
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                border="none"
                borderRadius="6px"
                h={"50px"}
                placeholder={"프로젝트명"}
                w="190px"
                py={3}
                defaultValue={search}
              />
            )}
            control={searchControl}
            name={"title"}
          />

          <Button
            bg="primary"
            _hover={{ bg: "white" }}
            border="1px"
            borderColor="primary"
            borderRadius="6px"
            h={["40px", null, null, "52px"]}
            type="submit"
            p={0}
            role="group"
            w={["40px", null, null, "52px"]}
          >
            <Center _groupHover={{ color: "primary" }} color="subText" w="100%">
              <MdSearch fontSize="24px" />
            </Center>
          </Button>
        </Center>
      </form>
    </Center>
  );
}
