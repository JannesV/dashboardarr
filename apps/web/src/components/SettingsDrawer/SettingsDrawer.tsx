import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { stripTypenames } from "@dashboardarr/common";
import {
  GetConfigDocument,
  GetConfigQuery,
  GetConfigQueryVariables,
  Service,
  SettingsInput,
  useDeleteServiceMutation,
  useUpdateSettingsMutation,
} from "@dashboardarr/graphql";
import { Formik, FormikHelpers } from "formik";
import { InputControl } from "formik-chakra-ui";
import { useAtom, useSetAtom } from "jotai";
import { FunctionComponent, useCallback } from "react";
import { createServiceAtom, editServiceAtom } from "../../state/service";
import { settingsOpenAtom } from "../../state/settings";
import { useConfig } from "../../utils/useConfig";
import { ColorModeSlider } from "../ColorModeSlider/ColorModeSlider";
import { ServicesList } from "./ServiceList/ServicesList";

import { BiAddToQueue } from "react-icons/bi";
import { PopConfirm } from "../PopConfirm/PopConfirm";

interface SettingsDrawerProps {}

export const SettingsDrawer: FunctionComponent<SettingsDrawerProps> = () => {
  const [isOpen, setIsOpen] = useAtom(settingsOpenAtom);
  const { name, settings } = useConfig();

  const setEditServiceId = useSetAtom(editServiceAtom);
  const setCreateServiceModal = useSetAtom(createServiceAtom);

  const [deleteService, { loading: deleteLoading }] =
    useDeleteServiceMutation();

  const [updateSettings, { loading }] = useUpdateSettingsMutation({
    update(cache, { data }) {
      if (data) {
        cache.updateQuery<GetConfigQuery, GetConfigQueryVariables>(
          {
            query: GetConfigDocument,
            variables: { configName: name },
          },
          () => ({
            config: data.updateSettings,
          })
        );
      }
    },
  });

  const serviceAddon = useCallback(
    (service: Service) => (
      <>
        <IconButton
          size="sm"
          aria-label="Edit"
          variant="ghost"
          icon={<EditIcon />}
          onClick={() => setEditServiceId(service.id)}
        />
        <PopConfirm placement="left-end">
          <IconButton
            ml={2}
            size="sm"
            aria-label="Delete"
            colorScheme="red"
            variant="ghost"
            icon={<DeleteIcon />}
            isLoading={deleteLoading}
            onClick={() =>
              deleteService({
                variables: { ids: [service.id] },
                update(cache) {
                  const normalizedId = cache.identify({
                    id: service.id,
                    __typename: "Service",
                  });
                  cache.evict({ id: normalizedId });
                  cache.gc();
                },
              })
            }
          />
        </PopConfirm>
      </>
    ),
    [deleteLoading, deleteService, setEditServiceId]
  );

  const handleSubmit = (
    values: SettingsInput,
    helpers: FormikHelpers<SettingsInput>
  ) => {
    updateSettings({
      variables: {
        configName: name,
        settings: values,
      },
    });
  };

  return (
    <Drawer size="md" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <DrawerOverlay />
      <Formik<SettingsInput>
        initialValues={{ ...stripTypenames(settings) } as any}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DrawerContent>
              <DrawerHeader>Settings</DrawerHeader>
              <DrawerBody>
                <Tabs>
                  <TabList>
                    <Tab>General</Tab>
                    <Tab>Services</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <VStack>
                        <InputControl
                          label="Title"
                          inputProps={{ placeholder: "Title" }}
                          name="title"
                          placeholder="Title"
                        />
                        <InputControl
                          label="Logo"
                          inputProps={{ placeholder: "Logo" }}
                          name="logo"
                          placeholder="Logo"
                        />
                        <InputControl
                          label="Fav Icon"
                          inputProps={{ placeholder: "Fav Icon" }}
                          name="favIcon"
                          placeholder="Fav Icon"
                        />

                        <FormControl>
                          <FormLabel>Color Mode</FormLabel>
                          <ColorModeSlider name="colorMode" />

                          <FormHelperText>
                            Choose between light and darkmode. Or automatically
                            match your system&apos;s choice when set on{" "}
                            <Text as="i">Auto</Text>.
                          </FormHelperText>
                        </FormControl>
                      </VStack>
                      <Divider my={4} />
                      <Button
                        colorScheme="blue"
                        isLoading={loading}
                        type="submit"
                      >
                        Save Settings
                      </Button>
                    </TabPanel>
                    <TabPanel>
                      <ServicesList addon={serviceAddon} />
                      <Divider my={4} />
                      <Button
                        colorScheme="blue"
                        leftIcon={<Icon fontSize="1.2em" as={BiAddToQueue} />}
                        onClick={() => setCreateServiceModal(true)}
                      >
                        Add Service
                      </Button>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </DrawerBody>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </form>
        )}
      </Formik>
    </Drawer>
  );
};
