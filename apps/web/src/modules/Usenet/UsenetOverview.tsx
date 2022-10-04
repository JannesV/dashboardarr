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
  ServiceType,
  useGetServicesQuery,
  useGetUsenetInfoQuery,
  usePauseUsenetQueueMutation,
  useResumeUsenetQueueMutation,
} from "@dashboardarr/graphql";
import { FC, useEffect, useState } from "react";
import { ModuleBox } from "../../components/ModuleBox/ModuleBox";
import { parseEta } from "../../utils/formatDuration";
import { humanFileSize } from "../../utils/humanFileSize";
import { UsenetDownloads } from "./UsenetDownloads/UsenetDownloads";
import { UsenetHistory } from "./UsenetHistory/UsenetHistory";
import { MdPause, MdPlayArrow } from "react-icons/md";

export const UsernetOverview: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // TODO Get services in a better way
  const { data: servicesData } = useGetServicesQuery();
  const sabSevice = servicesData?.services.find(
    (s) => s.type === ServiceType.Sabnzbd
  );

  const serviceId = sabSevice?.id || "";

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
    skip: !sabSevice,
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

        <TabPanels>
          <TabPanel p={0} pt={5}>
            <UsenetDownloads
              paused={usenetInfoData?.usenetInfo.paused ?? true}
              serviceId={serviceId}
            />
          </TabPanel>
          <TabPanel p={0} pt={5}>
            <UsenetHistory serviceId={serviceId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ModuleBox>
  );
};
