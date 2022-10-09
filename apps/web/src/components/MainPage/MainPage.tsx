import { Box, Flex, Grid } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { NavBar } from "../NavBar/NavBar";
import { UsernetOverview } from "../../modules/Usenet/UsenetOverview";
import { Calendar } from "../Calendar/Calendar";
import { useGetConfigQuery, useGetServicesQuery } from "@dashboardarr/graphql";
import { ServiceItem } from "../ServiceItem/ServiceItem";
import { useColorModeTracker } from "../../utils/useColorModeTracker";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = () => {
  const { data } = useGetServicesQuery();
  const { data: configData } = useGetConfigQuery({
    variables: { configName: "default" },
  });

  useColorModeTracker(configData?.config.settings.colorMode);

  return (
    <Box w="100%">
      <NavBar />

      <Flex>
        <Flex w="full" direction="column">
          <Grid
            p={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={4}
          >
            {data?.services.map((item) => (
              <ServiceItem service={item} key={item.id} />
            ))}
          </Grid>
          {configData?.config.modules.map((mod) => {
            if (mod.__typename === "UsenetModule") {
              return <UsernetOverview key={mod.id} config={mod} />;
            }
          })}
        </Flex>
        {/* SIDEBAR */}
        <Box>
          {configData?.config.modules.map((mod) => {
            if (mod.__typename === "CalendarModule") {
              return <Calendar key={mod.id} config={mod} />;
            }
          })}
        </Box>
      </Flex>
    </Box>
  );
};
