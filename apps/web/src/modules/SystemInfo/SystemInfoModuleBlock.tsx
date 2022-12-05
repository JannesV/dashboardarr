import { Text, useToken } from "@chakra-ui/react";
import {
  GetCpuLoadUpdateDocument,
  GetCpuLoadUpdateSubscription,
  useGetCpuLoadQuery,
} from "@dashboardarr/graphql";
import { FunctionComponent, useEffect } from "react";
import { ModuleBox } from "../../components/ModuleBox/ModuleBox";
import Chart from "react-apexcharts";
import { parseISO } from "date-fns";

interface SystemInfoModuleBlockProps {}

export const SystemInfoModuleBlock: FunctionComponent<
  SystemInfoModuleBlockProps
> = () => {
  const [blue400] = useToken("colors", ["blue.400"]);

  const { data, subscribeToMore } = useGetCpuLoadQuery({});

  useEffect(() => {
    subscribeToMore({
      document: GetCpuLoadUpdateDocument,
      updateQuery(
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: GetCpuLoadUpdateSubscription;
          };
        }
      ) {
        return {
          ...prev,
          cpuLoad: [...prev.cpuLoad, subscriptionData.data.cpuLoad],
        };
      },
    });
  }, [subscribeToMore]);

  const graphData = data?.cpuLoad.map((d) => ({
    x: parseISO(d.time).getTime(),
    y: d.value,
  }));

  return (
    <ModuleBox>
      {/* <Grid
        templateColumns="90px 35px 1fr"
        alignItems="center"
        rowGap={2}
        columnGap={2}
      >
        <Text fontSize="sm">RAM Usage:</Text>
        <Text fontSize="xs" opacity={0.6} textAlign="right">
          83%
        </Text>
        <Progress
          colorScheme="green"
          flex={1}
          size="sm"
          borderRadius="md"
          value={83}
        />

        <Text fontSize="sm">Disk Usage:</Text>
        <Text fontSize="xs" opacity={0.6} textAlign="right">
          64%
        </Text>
        <Progress flex={1} size="sm" borderRadius="md" value={64} />
      </Grid> */}

      <Text mt={0} fontSize="sm">
        CPU Usage
      </Text>
      <Chart
        type="line"
        options={{
          chart: {
            type: "line",
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 1000,
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
            borderColor: "rgba(255,255,255,0.1)",
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
                colors: "rgba(255,255,255,0.9)",
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
