import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Code,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGetUsenetQueueQuery } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";
import { parseEta } from "../../../utils/formatDuration";
import { humanFileSize } from "../../../utils/humanFileSize";

interface UsenetDownloadsProps {
  serviceId: string;
}

export const UsenetDownloads: FunctionComponent<UsenetDownloadsProps> = ({
  serviceId,
}) => {
  const { data: queueData, error } = useGetUsenetQueueQuery({
    variables: {
      serviceId,
      limit: 10,
      offset: 0,
    },
  });

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
      <Table>
        <Thead>
          <Tr>
            <Th pl={0}>Name</Th>
            <Th w={100}>Size</Th>
            <Th w={100}>ETA</Th>
            <Th w={300} pr={0}>
              Progress
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {queueData.usenetQueue.items.map((data) => (
            <Tr key={data.id}>
              <Td pl={0}>{data.name}</Td>
              <Td>{humanFileSize(data.size)}</Td>
              <Td>{parseEta(data.eta)}</Td>
              <Td display={"flex"} alignItems="center" pr={0}>
                {data.progress}%
                <Progress
                  minW={16}
                  ml={4}
                  w={"full"}
                  borderRadius={8}
                  value={data.progress}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};