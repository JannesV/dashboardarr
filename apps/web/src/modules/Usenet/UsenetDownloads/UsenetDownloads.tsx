import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Code,
  Progress,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGetUsenetQueueQuery } from "@dashboardarr/graphql";
import { FunctionComponent, useEffect } from "react";
import { parseEta } from "../../../utils/formatDuration";
import { humanFileSize } from "../../../utils/humanFileSize";

interface UsenetDownloadsProps {
  serviceId: string;
  paused: boolean;
}

export const UsenetDownloads: FunctionComponent<UsenetDownloadsProps> = ({
  serviceId,
  paused,
}) => {
  const {
    data: queueData,
    error,
    loading,
    startPolling,
    stopPolling,
  } = useGetUsenetQueueQuery({
    variables: {
      serviceId,
      limit: 10,
      offset: 0,
    },
  });

  useEffect(() => {
    startPolling(2000);
    return stopPolling;
  }, [startPolling, stopPolling]);

  if (error) {
    return (
      <Alert
        status="error"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          An error occurred while fetching queue.
        </AlertTitle>
        <AlertDescription mt={4}>
          <Code>{error.message}</Code>
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <Center height={32}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!queueData || !queueData.usenetQueue.total) {
    return (
      <Alert
        status="info"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        background="blackAlpha.100"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Queue is empty!
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
            <Th pl={0}>Name</Th>
            <Th w={100}>Size</Th>
            <Th w={100}>ETA</Th>
            <Th w={250} pr={0}>
              Progress
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {queueData.usenetQueue.items.map((item) => (
            <Tr key={item.id}>
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
              <Td>
                {paused ? (
                  <Text color="gray.400">Paused</Text>
                ) : (
                  parseEta(item.eta)
                )}
              </Td>

              <Td display={"flex"} alignItems="center" pr={0}>
                {item.progress}%
                <Progress
                  minW={16}
                  ml={4}
                  w={"full"}
                  borderRadius={8}
                  value={item.progress}
                  colorScheme={paused ? "gray" : "blue"}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
