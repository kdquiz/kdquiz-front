import { Center, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
interface Pagination {
  dataLength: number;
  pageKey?: string;
  sizeKey?: string;
}

export function QuizPagination({
  dataLength,
  pageKey = "page",
  sizeKey = "size",
}: Pagination) {
  const [searchParams, setSearchParams] = useSearchParams();
  const numberPage = Number(searchParams.get(pageKey)) + 1;
  const size = Number(searchParams.get(sizeKey) ?? 5);
  const totalPage = Math.ceil(dataLength / size);
  const center = numberPage > 2 && totalPage - 2 >= numberPage;
  const offset =
    totalPage > 5
      ? center
        ? numberPage - 3
        : totalPage - 2 < numberPage
          ? totalPage - 5
          : 0
      : 0;

  if (!dataLength) return;
  return (
    <Center gap={2}>
      <Center
        onClick={() => {
          if (numberPage !== 1) {
            searchParams.set("page", "0");
            setSearchParams(searchParams);
            window.scrollTo({ top: 0 });
          }
        }}
        cursor={"pointer"}
        boxSize={5}
      >
        {numberPage > 1 && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.28424 1.39459C5.57713 1.10169 5.57713 0.626821 5.28424 0.333928C4.99134 0.0410345 4.51647 0.0410346 4.22357 0.333928L5.28424 1.39459ZM0.753906 4.86426L0.223576 4.33393C-0.0693171 4.62682 -0.069317 5.1017 0.223576 5.39459L0.753906 4.86426ZM4.22358 9.39459C4.51647 9.68748 4.99134 9.68748 5.28424 9.39459C5.57713 9.1017 5.57713 8.62682 5.28424 8.33393L4.22358 9.39459ZM4.22357 0.333928L0.223576 4.33393L1.28424 5.39459L5.28424 1.39459L4.22357 0.333928ZM0.223576 5.39459L4.22358 9.39459L5.28424 8.33393L1.28424 4.33393L0.223576 5.39459Z"
              fill="#495057"
            />
            <path
              d="M13.2842 1.39459C13.5771 1.10169 13.5771 0.626821 13.2842 0.333928C12.9913 0.0410345 12.5165 0.0410346 12.2236 0.333928L13.2842 1.39459ZM8.75391 4.86426L8.22358 4.33393C7.93068 4.62682 7.93068 5.1017 8.22358 5.39459L8.75391 4.86426ZM12.2236 9.39459C12.5165 9.68748 12.9913 9.68748 13.2842 9.39459C13.5771 9.1017 13.5771 8.62682 13.2842 8.33393L12.2236 9.39459ZM12.2236 0.333928L8.22358 4.33393L9.28424 5.39459L13.2842 1.39459L12.2236 0.333928ZM8.22358 5.39459L12.2236 9.39459L13.2842 8.33393L9.28424 4.33393L8.22358 5.39459Z"
              fill="#495057"
            />
          </svg>
        )}
      </Center>
      <Center
        cursor={"pointer"}
        onClick={() => {
          if (numberPage !== 1) {
            searchParams.set("page", String(numberPage - 2));
            setSearchParams(searchParams);
            window.scrollTo({ top: 0 });
          }
        }}
        boxSize={5}
      >
        {numberPage > 1 && (
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.28424 1.39459C5.57713 1.10169 5.57713 0.626821 5.28424 0.333928C4.99134 0.0410345 4.51647 0.0410346 4.22357 0.333928L5.28424 1.39459ZM0.753906 4.86426L0.223576 4.33393C-0.0693171 4.62682 -0.069317 5.1017 0.223576 5.39459L0.753906 4.86426ZM4.22358 9.39459C4.51647 9.68748 4.99134 9.68748 5.28424 9.39459C5.57713 9.1017 5.57713 8.62682 5.28424 8.33393L4.22358 9.39459ZM4.22357 0.333928L0.223576 4.33393L1.28424 5.39459L5.28424 1.39459L4.22357 0.333928ZM0.223576 5.39459L4.22358 9.39459L5.28424 8.33393L1.28424 4.33393L0.223576 5.39459Z"
              fill="#495057"
            />
          </svg>
        )}
      </Center>
      <Center className={"gap-3"} gap={2}>
        {Array(totalPage >= 5 ? 5 : totalPage)
          .fill(0)
          .map((_, i) => (
            <Center
              key={offset + i}
              bg={offset + i + 1 === numberPage ? "primary" : "transparent"}
              borderRadius={"100%"}
              boxSize={9}
              onClick={() => {
                searchParams.set("page", String(offset + i));
                setSearchParams(searchParams);
                window.scrollTo({ top: 0 });
              }}
              cursor={"pointer"}
            >
              <Text
                style={{
                  color: offset + i + 1 === numberPage ? "white" : "gray",
                  transition: ".25s",
                }}
                fontSize={"xl"}
              >
                {offset + i + 1}
              </Text>
            </Center>
          ))}
      </Center>
      <Center
        cursor={"pointer"}
        boxSize={5}
        onClick={() => {
          if (numberPage !== totalPage) {
            searchParams.set("page", String(numberPage));
            setSearchParams(searchParams);
            window.scrollTo({ top: 0 });
          }
        }}
      >
        {numberPage < totalPage && (
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.223576 8.33393C-0.0693168 8.62682 -0.0693168 9.1017 0.223576 9.39459C0.51647 9.68748 0.991343 9.68748 1.28424 9.39459L0.223576 8.33393ZM4.75391 4.86426L5.28424 5.39459C5.57713 5.10169 5.57713 4.62682 5.28424 4.33393L4.75391 4.86426ZM1.28424 0.333928C0.991343 0.0410345 0.516469 0.0410345 0.223576 0.333928C-0.069317 0.626821 -0.069317 1.10169 0.223576 1.39459L1.28424 0.333928ZM1.28424 9.39459L5.28424 5.39459L4.22358 4.33393L0.223576 8.33393L1.28424 9.39459ZM5.28424 4.33393L1.28424 0.333928L0.223576 1.39459L4.22358 5.39459L5.28424 4.33393Z"
              fill="#495057"
            />
          </svg>
        )}
      </Center>
      <Center
        cursor={"pointer"}
        boxSize={5}
        onClick={() => {
          if (numberPage !== totalPage) {
            searchParams.set("page", String(totalPage - 1));
            setSearchParams(searchParams);
            window.scrollTo({ top: 0 });
          }
        }}
      >
        {numberPage < totalPage && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.22358 1.39459C7.93068 1.10169 7.93068 0.626821 8.22358 0.333928C8.51647 0.0410345 8.99134 0.0410346 9.28424 0.333928L8.22358 1.39459ZM12.7539 4.86426L13.2842 4.33393C13.5771 4.62682 13.5771 5.1017 13.2842 5.39459L12.7539 4.86426ZM9.28424 9.39459C8.99134 9.68748 8.51647 9.68748 8.22358 9.39459C7.93068 9.1017 7.93068 8.62682 8.22358 8.33393L9.28424 9.39459ZM9.28424 0.333928L13.2842 4.33393L12.2236 5.39459L8.22358 1.39459L9.28424 0.333928ZM13.2842 5.39459L9.28424 9.39459L8.22358 8.33393L12.2236 4.33393L13.2842 5.39459Z"
              fill="#495057"
            />
            <path
              d="M0.223577 1.39459C-0.0693159 1.10169 -0.0693159 0.626821 0.223577 0.333928C0.516471 0.0410345 0.991344 0.0410346 1.28424 0.333928L0.223577 1.39459ZM4.75391 4.86426L5.28424 4.33393C5.57713 4.62682 5.57713 5.1017 5.28424 5.39459L4.75391 4.86426ZM1.28424 9.39459C0.991343 9.68748 0.516469 9.68748 0.223576 9.39459C-0.0693173 9.1017 -0.0693173 8.62682 0.223576 8.33393L1.28424 9.39459ZM1.28424 0.333928L5.28424 4.33393L4.22358 5.39459L0.223577 1.39459L1.28424 0.333928ZM5.28424 5.39459L1.28424 9.39459L0.223576 8.33393L4.22358 4.33393L5.28424 5.39459Z"
              fill="#495057"
            />
          </svg>
        )}
      </Center>
    </Center>
  );
}
