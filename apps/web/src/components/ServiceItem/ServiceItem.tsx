import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  GridItem,
  Flex,
  Text,
  Image,
  useColorModeValue,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import {
  ServiceFragment,
  useDeleteServiceMutation,
} from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { editServiceAtom } from "../../state/service";
import { ModuleBox } from "../ModuleBox/ModuleBox";

interface ServiceItemProps {
  service: ServiceFragment;
}

export const ServiceItem: FunctionComponent<ServiceItemProps> = ({
  service,
}) => {
  const [, setEditServiceId] = useAtom(editServiceAtom);

  const [deleteService] = useDeleteServiceMutation({
    update(cache) {
      const normalizedId = cache.identify({
        id: service.id,
        __typename: "Service",
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const { border } = useColorModeValue(
    { border: "gray.100" },
    { border: "gray.700" }
  );

  return (
    <GridItem>
      <ModuleBox
        _hover={{ shadow: "lg", backgroundColor: border }}
        cursor="pointer"
        onClick={() =>
          window.open(service.externalUrl || service.url, "__blank")
        }
        pos="relative"
        m={0}
        transitionDuration="0.2s"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          transitionDuration="normal"
          direction="column"
        >
          <Menu size="md">
            <MenuButton
              onClick={(e) => e.stopPropagation()}
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="ghost"
              size="xs"
              pos="absolute"
              top={2}
              left={2}
            />
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditServiceId(service.id);
                }}
                icon={<EditIcon />}
              >
                Edit Service
              </MenuItem>
              <MenuItem
                _hover={{
                  bgColor: "red.400",
                }}
                icon={<DeleteIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteService({ variables: { ids: [service.id] } });
                }}
              >
                Delete Service
              </MenuItem>
            </MenuList>
          </Menu>
          <Text fontWeight={"bold"} pb={4}>
            {service.name}
          </Text>
          <Image mb={6} boxSize={100} objectFit="cover" src={service.icon} />
        </Flex>
      </ModuleBox>
    </GridItem>
  );
};
