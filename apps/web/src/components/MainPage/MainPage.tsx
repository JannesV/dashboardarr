import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { NavBar } from "../NavBar/NavBar";
import { UsernetOverview } from "../../modules/Usenet/UsenetOverview";
import { Calendar } from "../Calendar/Calendar";
import { useGetServicesQuery } from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { editServiceAtom } from "../../state/service";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = () => {
  const [, setEditServiceId] = useAtom(editServiceAtom);
  const { border } = useColorModeValue(
    { border: "gray.100" },
    { border: "gray.700" }
  );

  const { data } = useGetServicesQuery();

  return (
    <Box w="100%">
      <NavBar />

      <Flex>
        <Flex w="full" direction="column">
          <Grid
            p={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={10}
          >
            {data?.services.map((item) => (
              <GridItem onClick={() => setEditServiceId(item.id)} key={item.id}>
                <Flex
                  shadow="md"
                  rounded="20"
                  alignItems="center"
                  justifyContent="center"
                  border="1px"
                  borderColor={border}
                  transitionDuration="normal"
                  direction="column"
                  p={4}
                  cursor="pointer"
                  _hover={{ shadow: "lg", backgroundColor: border }}
                >
                  <Text fontWeight={"bold"} pb={4}>
                    {item.name}
                  </Text>
                  <Image boxSize={100} objectFit="cover" src={item.icon} />
                </Flex>
              </GridItem>
            ))}
          </Grid>
          <UsernetOverview />
        </Flex>
        {/* SIDEBAR */}
        <Box>
          <Calendar />
        </Box>
      </Flex>
    </Box>
  );
};
