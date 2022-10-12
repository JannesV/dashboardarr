import { Flex, Text, Image } from "@chakra-ui/react";
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
    >
      <Text fontWeight={"bold"} noOfLines={1} textAlign="center" mb={4}>
        {service.name}
      </Text>
      <Image mb={6} boxSize={100} objectFit="contain" src={service.icon} />
    </Flex>
  );
};
