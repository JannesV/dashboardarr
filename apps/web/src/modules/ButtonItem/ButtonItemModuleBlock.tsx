import { Flex, Image } from "@chakra-ui/react";
import { ButtonModule } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";

interface ButtonItemModuleBlockProps {
  item: ButtonModule;
}

export const ButtonItemModuleBlock: FunctionComponent<
  ButtonItemModuleBlockProps
> = ({ item: { service } }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      transitionDuration="normal"
      direction="column"
      data-id={service.id}
      h="full"
      w="full"
      onClick={() => window.open(service.externalUrl || service.url, "_blank")}
      cursor="pointer"
    >
      {/* <Text fontWeight={"bold"} noOfLines={1} textAlign="center" mb={4}>
        {service.name}
      </Text> */}
      {/* <Box w="full" h="full"> */}
      <Image h="full" objectFit="contain" src={service.icon} />
      {/* </Box> */}
    </Flex>
  );
};
