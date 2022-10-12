import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Service } from "@dashboardarr/graphql";
import { FunctionComponent, ReactNode } from "react";

interface ServiceListItemProps {
  service: Service;
  onClick?(item: Service): void;
  addon?(item: Service): ReactNode;
}

export const ServiceListItem: FunctionComponent<ServiceListItemProps> = ({
  service,
  onClick,
  addon,
}) => {
  const { borderColor } = useColorModeValue(
    {
      borderColor: "gray.300",
    },
    { borderColor: "white.300" }
  );

  return (
    <Flex
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="md"
      w="full"
      p={2}
      key={service.id}
      alignItems="center"
      cursor={onClick ? "pointer" : "default"}
      _hover={
        onClick
          ? {
              bgColor: "blue.200",
            }
          : undefined
      }
      transition=".2s"
      onClick={() => onClick?.(service)}
    >
      <Image mr={3} boxSize={25} objectFit="contain" src={service.icon} />
      <Text noOfLines={1}>{service.name}</Text>
      {addon && <Box ml="auto">{addon(service)}</Box>}
    </Flex>
  );
};
