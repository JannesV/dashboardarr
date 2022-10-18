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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Code,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useGetUsenetHistoryQuery } from "@dashboardarr/graphql";
import { parseISO } from "date-fns";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { parseDuration } from "../../../utils/formatDuration";
import { formatRelative } from "../../../utils/formatRelative";
import { humanFileSize } from "../../../utils/humanFileSize";

interface UsenetHistoryProps {
  serviceId: string;
  pageSize: number | null;
}

export const UsenetHistory: FunctionComponent<UsenetHistoryProps> = ({
  serviceId,
  pageSize,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: historyData,
    error,
    loading,
    startPolling,
    stopPolling,
  } = useGetUsenetHistoryQuery({
    variables: {
      serviceId,
      limit: pageSize!,
      offset: (currentPage - 1) * pageSize!,
    },
    skip: !pageSize,
  });

  useEffect(() => {
    startPolling(2000);
    return stopPolling;
  }, [startPolling, stopPolling]);

  const {
    pages,
    setCurrentPage: setPaginationPage,
    setPageSize,
    pagesCount,
    pageSize: currentPageSize,
  } = usePagination({
    initialState: { currentPage: 1, pageSize: 1 },
    total: historyData?.usenetHistory.total || 0,
    limits: {
      inner: 2,
      outer: 2,
    },
  });

  useEffect(() => {
    if (pageSize && currentPageSize !== pageSize) {
      setPageSize(pageSize);
    }
  }, [currentPageSize, pageSize, setPageSize]);

  const handleChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setPaginationPage(page);
    },
    [setPaginationPage]
  );

  if (error) {
    return (
      <Alert
        status="error"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="full"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          An error occurred while fetching history.
        </AlertTitle>
        <AlertDescription mt={4}>
          <Code>{error.message}</Code>
        </AlertDescription>
      </Alert>
    );
  }

  if (loading || !historyData) {
    return (
      <Center height={32}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!historyData || !historyData.usenetHistory.total) {
    return (
      <Alert
        status="info"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="full"
        background="blackAlpha.100"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          History is empty!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Maybe it&lsquo;s time to download some new stuff?
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <TableContainer>
      <Table style={{ tableLayout: "fixed" }} size="sm">
        <Thead>
          <Tr>
            <Th minW={0} pl={0}>
              Name
            </Th>
            <Th w={100}>Size</Th>
            <Th textAlign="right" w={175}>
              Date Completed
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {historyData.usenetHistory.items.map((item) => (
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
              <Td textAlign="right">
                <Tooltip label={`Completed in ${parseDuration(item.time)}`}>
                  {formatRelative(parseISO(item.completedOn))}
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      >
        <PaginationContainer justifyContent="center" mt={4}>
          <PaginationPrevious
            bg="none"
            w={8}
            h={8}
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
                w={8}
                h={8}
                fontSize="small"
                borderWidth={1}
                borderColor="whiteAlpha.200"
                key={`page_${page}`}
                page={page}
                _current={{
                  bgColor: "blue.300",
                  color: "white",
                }}
                _hover={{
                  borderColor: "whiteAlpha.500",
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            bg="none"
            w={8}
            h={8}
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
