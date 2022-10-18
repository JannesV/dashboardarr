import {
  Button,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
} from "@chakra-ui/react";
import {
  GetUsenetInfoDocument,
  GetUsenetInfoQuery,
  GetUsenetInfoQueryVariables,
  useGetUsenetInfoQuery,
  usePauseUsenetQueueMutation,
  useResumeUsenetQueueMutation,
} from "@dashboardarr/graphql";
import { FunctionComponent, useEffect, useState } from "react";
import { parseEta } from "../../utils/formatDuration";
import { humanFileSize } from "../../utils/humanFileSize";
import { UsenetDownloads } from "./UsenetDownloads/UsenetDownloads";
import { UsenetHistory } from "./UsenetHistory/UsenetHistory";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useResizeDetector } from "react-resize-detector";
import { ModuleBox } from "../../components/ModuleBox/ModuleBox";

interface UsernetModuleBlockProps {
  serviceId: string;
}

export const UsernetModuleBlock: FunctionComponent<UsernetModuleBlockProps> = ({
  serviceId,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { ref, height } = useResizeDetector({
    handleWidth: false,
    refreshMode: "debounce",
    refreshRate: 200,
  });

  const pageSize = height ? Math.floor((height - 90) / 33) : null;

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const {
    data: usenetInfoData,
    previousData,
    startPolling,
    stopPolling,
  } = useGetUsenetInfoQuery({
    variables: {
      serviceId,
    },
  });

  useEffect(() => {
    startPolling(2000);
    return stopPolling;
  }, [startPolling, stopPolling]);

  const [resumeQueue, { loading: resumeLoading }] =
    useResumeUsenetQueueMutation({
      variables: { serviceId },
      update(cache, { data }) {
        if (data) {
          cache.updateQuery<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>(
            {
              query: GetUsenetInfoDocument,
              variables: { serviceId },
            },
            () => ({
              usenetInfo: data.resumeUsenetQueue,
            })
          );
        }
      },
    });

  const [pauseQueue, { loading: pauseLoading }] = usePauseUsenetQueueMutation({
    variables: { serviceId },
    update(cache, { data }) {
      if (data) {
        cache.updateQuery<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>(
          {
            query: GetUsenetInfoDocument,
            variables: { serviceId },
          },
          () => ({
            usenetInfo: data.pauseUsenetQueue,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (!previousData && usenetInfoData?.usenetInfo.itemsRemaining === 0) {
      setTabIndex(1);
    }
  }, [usenetInfoData, previousData]);

  return (
    <ModuleBox>
      <Tabs
        alignItems="center"
        justifyContent="center"
        index={tabIndex}
        onChange={handleTabsChange}
        h="full"
      >
        <TabList>
          <Tab>Queue</Tab>
          <Tab>History</Tab>
          <HStack alignItems="center" h="6" spacing="5" ml="auto">
            <Tag colorScheme="blue" size="sm" borderRadius="full">
              {humanFileSize(usenetInfoData?.usenetInfo.speed || 0)}/s
            </Tag>
            <Tag colorScheme="blue" size="sm" borderRadius="full">
              Size Remaining: &nbsp;
              {humanFileSize(usenetInfoData?.usenetInfo.sizeLeft || 0)}
            </Tag>
            {usenetInfoData?.usenetInfo.paused ? (
              <Button
                onClick={() => resumeQueue()}
                isLoading={resumeLoading}
                size="sm"
                borderRadius="full"
              >
                <Icon mr={2} as={MdPlayArrow} />
                PAUSED
              </Button>
            ) : (
              <Button
                onClick={() => pauseQueue()}
                isLoading={pauseLoading}
                size="sm"
                borderRadius="full"
              >
                <Icon mr={2} as={MdPause} />
                {parseEta(usenetInfoData?.usenetInfo.eta || 0)}
              </Button>
            )}
          </HStack>
        </TabList>

        <TabPanels h="calc(100% - 42px)" ref={ref}>
          <TabPanel h="full" p={0} pt={5}>
            <UsenetDownloads
              pageSize={pageSize}
              paused={usenetInfoData?.usenetInfo.paused ?? true}
              serviceId={serviceId}
            />
          </TabPanel>
          <TabPanel h="full" p={0} pt={5}>
            <UsenetHistory serviceId={serviceId} pageSize={pageSize} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ModuleBox>
  );
};
