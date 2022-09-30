import {
  Button,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ServiceType,
  useGetServicesQuery,
  useGetUsenetInfoQuery,
} from "@dashboardarr/graphql";
import { FC, useEffect, useState } from "react";
import { parseDuration } from "../../utils/formatDuration";
import { humanFileSize } from "../../utils/humanFileSize";
import { UsenetDownloads } from "./UsenetDownloads/UsenetDownloads";
import { UsenetHistory } from "./UsenetHistory/UsenetHistory";

export const UsernetOverview: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const { border } = useColorModeValue(
    { border: "gray.200" },
    { border: "gray.700" }
  );

  // TODO Get services in a better way
  const { data: servicesData } = useGetServicesQuery();
  const sabSevice = servicesData?.services.find(
    (s) => s.type === ServiceType.Sabnzbd
  );

  const serviceId = sabSevice?.id || "";

  const { data: historyData, previousData } = useGetUsenetInfoQuery({
    variables: {
      serviceId,
    },
    skip: !sabSevice,
  });

  useEffect(() => {
    if (!previousData && historyData?.usenetInfo.itemsRemaining === 0) {
      setTabIndex(1);
    }
  }, [historyData, previousData]);

  return (
    <Tabs
      shadow="md"
      rounded="20"
      alignItems="center"
      justifyContent="center"
      border="1px"
      borderColor={border}
      m="4"
      p="4"
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList>
        <Tab>Queue</Tab>
        <Tab>History</Tab>
        <HStack alignItems="center" h="6" spacing="5" ml="auto">
          <Tag colorScheme="orange" size="sm" borderRadius="full">
            {humanFileSize(historyData?.usenetInfo.speed || 0)}/s
          </Tag>
          <Tag colorScheme="orange" size="sm" borderRadius="full">
            Size Remaining:{" "}
            {humanFileSize(historyData?.usenetInfo.sizeLeft || 0)}
          </Tag>
          <Button size="sm" borderRadius="full">
            {parseDuration(historyData?.usenetInfo.eta || 0)}
          </Button>
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UsenetDownloads serviceId={serviceId} />
        </TabPanel>
        <TabPanel>
          <UsenetHistory serviceId={serviceId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
