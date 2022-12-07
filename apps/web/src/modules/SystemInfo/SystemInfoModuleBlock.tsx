import {
  Grid,
  Progress,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import {
  CurrentCpuLoadDocument,
  CurrentCpuLoadSubscription,
  CurrentMemoryUsageDocument,
  CurrentMemoryUsageSubscription,
  useGetCpuLoadHistoryQuery,
  useGetMemoryInfoQuery,
} from "@dashboardarr/graphql";
import { FunctionComponent, useEffect } from "react";
import { ModuleBox } from "../../components/ModuleBox/ModuleBox";
import Chart from "react-apexcharts";
import { parseISO } from "date-fns";

interface SystemInfoModuleBlockProps {}

export const SystemInfoModuleBlock: FunctionComponent<
  SystemInfoModuleBlockProps
> = () => {
  const [blue400, black800, black200, whiteAlhpa800, whiteAlhpa200] = useToken(
    "colors",
    [
      "blue.400",
      "blackAlpha.800",
      "blackAlpha.200",
      "whiteAlpha.800",
      "whiteAlpha.200",
    ]
  );

  const { text, grid } = useColorModeValue(
    { text: black800, grid: black200 },
    { text: whiteAlhpa800, grid: whiteAlhpa200 }
  );

  const { data: cpuData, subscribeToMore } = useGetCpuLoadHistoryQuery({});

  const { data: memoryData, subscribeToMore: subscribeToMoreMemoryInfo } =
    useGetMemoryInfoQuery();

  useEffect(() => {
    subscribeToMore({
      document: CurrentCpuLoadDocument,
      updateQuery(
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: CurrentCpuLoadSubscription;
          };
        }
      ) {
        // Reset this when the dataset becomes too large
        // This creates a small visual artifact but it's better than a memory leak.
        return {
          ...prev,
          cpuLoadHistory: [
            ...(prev.cpuLoadHistory.length > 500
              ? prev.cpuLoadHistory.slice(-10)
              : prev.cpuLoadHistory),
            subscriptionData.data.currentCpuLoad,
          ],
        };
      },
    });
    subscribeToMoreMemoryInfo({
      document: CurrentMemoryUsageDocument,
      updateQuery(
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: CurrentMemoryUsageSubscription;
          };
        }
      ) {
        return {
          ...prev,
          memoryInfo: {
            ...prev.memoryInfo,
            usedMemory: subscriptionData.data.currentMemoryUsage.value,
          },
        };
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const graphData = cpuData?.cpuLoadHistory.map((d) => ({
    x: parseISO(d.time).getTime(),
    y: d.value,
  }));

  const latestCPU = cpuData?.cpuLoadHistory.slice(-1)?.[0];

  const memoryPercentage = memoryData
    ? (memoryData.memoryInfo.usedMemory / memoryData.memoryInfo.totalMemory) *
      100
    : 0;

  return (
    <ModuleBox>
      <Grid
        templateColumns="90px 35px 1fr"
        alignItems="center"
        rowGap={2}
        columnGap={2}
      >
        <Text fontSize="sm">RAM Usage:</Text>
        <Text fontSize="xs" opacity={0.6} textAlign="right">
          {Math.round(memoryPercentage)}%
        </Text>
        <Progress
          colorScheme="green"
          flex={1}
          size="sm"
          borderRadius="md"
          value={memoryPercentage}
        />

        <Text fontSize="sm">CPU Usage:</Text>
        <Text fontSize="xs" opacity={0.6} textAlign="right">
          {Math.round(latestCPU?.value || 0)}%
        </Text>
        <Progress
          flex={1}
          size="sm"
          borderRadius="md"
          value={latestCPU?.value || 0}
        />
      </Grid>

      <Text mt={6} fontSize="sm">
        CPU Usage
      </Text>
      <Chart
        type="line"
        options={{
          chart: {
            parentHeightOffset: 0,
            type: "line",
            offsetX: 0,
            offsetY: 0,
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 2000,
              },
            },
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          tooltip: {
            enabled: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 2,
            colors: [blue400],
          },

          grid: {
            borderColor: grid,
            show: true,
            padding: {
              bottom: 0,
              left: 10,
              right: 0,
              top: 0,
            },
          },
          xaxis: {
            type: "datetime",
            range: 9000,
            labels: {
              show: false,
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            min: 0,
            max: 100,

            tickAmount: 4,
            decimalsInFloat: 0,
            labels: {
              maxWidth: 35,
              style: {
                colors: text,
              },
              formatter(val, opts?) {
                return `${val} %`;
              },
            },
          },
          legend: {
            show: false,
          },
        }}
        series={[{ data: graphData || [] }]}
        height={90}
      />
    </ModuleBox>
  );
};
