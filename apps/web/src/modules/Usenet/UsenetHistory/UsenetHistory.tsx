import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  usePagination,
} from "@ajna/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGetUsenetHistoryQuery } from "@dashboardarr/graphql";
import { FunctionComponent, useCallback, useState } from "react";
import { humanFileSize } from "../../../utils/humanFileSize";

interface UsenetHistoryProps {
  serviceId: string;
}

export const UsenetHistory: FunctionComponent<UsenetHistoryProps> = ({
  serviceId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: historyData } = useGetUsenetHistoryQuery({
    variables: {
      serviceId,
      limit: 10,
      offset: (currentPage - 1) * 10,
    },
  });

  const {
    pages,
    setCurrentPage: setPaginationPage,
    pagesCount,
  } = usePagination({
    initialState: { currentPage: 1, pageSize: 10 },
    total: historyData?.usenetHistory.total || 0,
    limits: {
      inner: 2,
      outer: 2,
    },
  });

  const handleChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setPaginationPage(page);
    },
    [setPaginationPage]
  );

  return (
    <TableContainer>
      <Table style={{ tableLayout: "fixed" }} size="sm">
        <Thead>
          <Tr>
            <Th minW={0} pl={0}>
              Name
            </Th>
            <Th w={100}>Size</Th>
            <Th w={100}>Duration</Th>
          </Tr>
        </Thead>
        <Tbody>
          {historyData?.usenetHistory.items.map((item) => (
            <Tr fontSize="sm" key={item.id}>
              <Td minW={0} pl={0}>
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {item.name}
                </Text>
              </Td>
              <Td>{humanFileSize(item.size)}</Td>
              <Td>{item.time}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      >
        <PaginationContainer justifyContent="center" my={4}>
          <PaginationPrevious
            bg="none"
            w={10}
            borderWidth={1}
            borderColor="whiteAlpha.200"
            _hover={{
              borderColor: "whiteAlpha.500",
            }}
            mr={1}
          >
            <ChevronLeftIcon />
          </PaginationPrevious>
          <PaginationPageGroup>
            {pages.map((page) => (
              <PaginationPage
                bg="none"
                w={10}
                borderWidth={1}
                borderColor="whiteAlpha.200"
                key={`page_${page}`}
                page={page}
                _current={{
                  bgColor: "blue.300",
                }}
                _hover={{
                  borderColor: "whiteAlpha.500",
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            bg="none"
            w={10}
            borderWidth={1}
            borderColor="whiteAlpha.200"
            _hover={{
              borderColor: "whiteAlpha.500",
            }}
            ml={1}
          >
            <ChevronRightIcon />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </TableContainer>
  );
};
