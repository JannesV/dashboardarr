import React from "react";
import {
  useColorModeValue,
  useDisclosure,
  chakra,
  Flex,
  HStack,
  IconButton,
  Box,
  VStack,
  CloseButton,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  useBoolean,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { SearchModal } from "../Search/SearchModal";
import { useHotkeys } from "react-hotkeys-hook";
import { useAtomValue, useSetAtom } from "jotai";
import { settingsOpenAtom } from "../../state/settings";
import { useConfig } from "../../utils/useConfig";
import {
  createModuleItemAtom,
  editDashboardModulesAtom,
} from "../../state/module";
import { MdDashboardCustomize } from "react-icons/md";
import { DashboardEditToggle } from "./DashboardEditToggle";

export const NavBar = () => {
  const isEditting = useAtomValue(editDashboardModulesAtom);
  const setisCreateModuleItem = useSetAtom(createModuleItemAtom);
  const setSettingsOpen = useSetAtom(settingsOpenAtom);

  const {
    settings: { title },
  } = useConfig();
  const { border } = useColorModeValue(
    { border: "gray.200" },
    { border: "gray.700" }
  );

  const [searchModalOpen, setSearchModalOpen] = useBoolean(false);

  useHotkeys("ctrl+k, command+k", setSearchModalOpen.toggle, {
    enableOnTags: ["INPUT"],
  });

  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <SearchModal isOpen={searchModalOpen} onClose={setSearchModalOpen.off} />
      <chakra.header
        borderColor={border}
        borderBottomWidth="1px"
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="sm"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            ></chakra.a>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              {title || "Dashboardarr"}
            </Text>
          </Flex>
          {isEditting ? (
            <DashboardEditToggle />
          ) : (
            <HStack display="flex" alignItems="center" spacing={1}>
              <InputGroup variant="filled">
                <Input
                  onClick={setSearchModalOpen.on}
                  w={72}
                  placeholder="Search"
                />
                <InputRightElement pr={6}>
                  <Kbd>
                    {navigator.platform.toLowerCase().includes("mac")
                      ? "⌘"
                      : "CTRL"}
                  </Kbd>
                  &nbsp;
                  <Kbd>K</Kbd>
                </InputRightElement>
              </InputGroup>
              <DashboardEditToggle />
              <Tooltip hasArrow placement="bottom-end" label="Add a new module">
                <IconButton
                  aria-label="Add a new module"
                  icon={<Icon fontSize={20} as={MdDashboardCustomize} />}
                  onClick={() => setisCreateModuleItem(true)}
                  variant="solid"
                />
              </Tooltip>
              <IconButton
                aria-label="Open the settings drawer"
                icon={<SettingsIcon />}
                onClick={() => setSettingsOpen(true)}
                variant="solid"
              />

              <Box
                display={{
                  base: "inline-flex",
                  md: "none",
                }}
              >
                <IconButton
                  display={{
                    base: "flex",
                    md: "none",
                  }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{
                    color: "inherit",
                  }}
                  variant="ghost"
                  onClick={mobileNav.onOpen}
                  icon={<HamburgerIcon />}
                />

                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={2}
                  bg={border}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                  />
                  {/* ITEMS GO HERE */}
                </VStack>
              </Box>
            </HStack>
          )}
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
