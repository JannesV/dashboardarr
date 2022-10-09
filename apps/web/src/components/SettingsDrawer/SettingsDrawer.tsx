import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useGetConfigQuery } from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { settingsOpenAtom } from "../../state/settings";
import { ColorModeSlider } from "../ColorModeSlider/ColorModeSlider";
import { ServicesList } from "./ServiceList/ServicesList";

interface SettingsDrawerProps {}

export const SettingsDrawer: FunctionComponent<SettingsDrawerProps> = () => {
  const [isOpen, setIsOpen] = useAtom(settingsOpenAtom);
  const { data } = useGetConfigQuery({ variables: { configName: "default" } });

  return (
    <Drawer size="md" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <DrawerOverlay />
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
                <FormControl>
                  <FormLabel>Color Mode</FormLabel>
                  <ColorModeSlider
                    value={data?.config.settings.colorMode}
                    onChange={console.log}
                  />

                  <FormHelperText>
                    Choose between light and darkmode. Or automatically match
                    your system&apos;s choice
                  </FormHelperText>
                </FormControl>
              </TabPanel>
              <TabPanel>
                <ServicesList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
