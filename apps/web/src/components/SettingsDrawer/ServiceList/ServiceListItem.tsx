import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { Service, useDeleteServiceMutation } from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { editServiceAtom } from "../../../state/service";

interface ServiceListItemProps {
  service: Service;
}

export const ServiceListItem: FunctionComponent<ServiceListItemProps> = ({
  service,
}) => {
  const [, setEditServiceId] = useAtom(editServiceAtom);

  const [deleteService, { loading: deleteLoading }] = useDeleteServiceMutation({
    update(cache) {
      const normalizedId = cache.identify({
        id: service.id,
        __typename: "Service",
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  return (
    <Flex
      borderWidth={1}
      borderColor="gray.300"
      borderRadius="md"
      w="full"
      p={2}
      key={service.id}
      alignItems="center"
    >
      <Image mr={3} boxSize={25} objectFit="contain" src={service.icon} />
      <Text noOfLines={1}>{service.name}</Text>
      <IconButton
        ml="auto"
        size="sm"
        aria-label="Edit"
        variant="ghost"
        icon={<EditIcon />}
        onClick={() => setEditServiceId(service.id)}
      />
      <IconButton
        ml={2}
        size="sm"
        aria-label="Delete"
        colorScheme="red"
        variant="ghost"
        icon={<DeleteIcon />}
        isLoading={deleteLoading}
        onClick={() => deleteService({ variables: { ids: [service.id] } })}
      />
    </Flex>
  );
};
