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
  useColorMode,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  useBoolean,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { SearchModal } from "../Search/SearchModal";
import { useHotkeys } from "react-hotkeys-hook";

export const NavBar = () => {
  const { border, SwitchIcon } = useColorModeValue(
    { border: "gray.200", SwitchIcon: MoonIcon },
    { border: "gray.700", SwitchIcon: SunIcon }
  );
  const { toggleColorMode } = useColorMode();

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
              Dashboardarr
            </Text>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <InputGroup>
                <Input onClick={setSearchModalOpen.on} placeholder="Search" />
                <InputRightElement pr={6}>
                  <Kbd>⌘</Kbd>&nbsp;
                  <Kbd>K</Kbd>
                </InputRightElement>
              </InputGroup>
            </HStack>
            <IconButton
              aria-label="Switch light/darkmode"
              icon={<SwitchIcon />}
              onClick={toggleColorMode}
              variant="ghost"
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
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
