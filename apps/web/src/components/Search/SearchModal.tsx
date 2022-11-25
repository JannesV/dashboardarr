import { SearchIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchQuery } from "@dashboardarr/graphql";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import scrollIntoView from "scroll-into-view-if-needed";

interface SearchModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const SearchModal: FunctionComponent<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const selectedElementRef = useRef<HTMLDivElement>();
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, previousData, loading } = useSearchQuery({
    variables: {
      search: searchValue,
      limit: 20,
    },
    skip: !searchValue,
  });

  const items = useMemo(
    () => data?.search || previousData?.search || [],
    [data?.search, previousData?.search]
  );

  useEffect(() => {
    if (selectedElementRef.current) {
      scrollIntoView(selectedElementRef.current, {
        scrollMode: "if-needed",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    addEventListener("keydown", handleKeypres);

    return () => {
      removeEventListener("keydown", handleKeypres);
    };
  });

  const handleSearchChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(ev.currentTarget.value);
      setSelectedIndex(0);
    },
    []
  );

  const handleClose = useCallback(() => {
    onClose();
    setSearchValue("");
    setSelectedIndex(0);
  }, [onClose]);

  const handleKeypres = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === "ArrowUp" || ev.code === "ArrowDown") {
        ev.preventDefault();
      }

      if (!items) {
        return;
      }

      if (ev.code === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (ev.code === "ArrowDown" && selectedIndex < items.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (ev.code === "Enter") {
        window.open(items[selectedIndex].url, "_blank");
      }
    },
    [items, selectedIndex]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="2xl">
        <Flex alignItems="center" p={4}>
          <SearchIcon fontSize={20} mr={4} />
          <Input
            value={searchValue}
            onChange={handleSearchChange}
            variant="unstyled"
            placeholder="Search"
          />
          {loading && <Spinner speed="1s" />}
        </Flex>
        {!!items.length && (
          <>
            <Divider />
            <Box maxH={600} m={4} overflowY="auto">
              <VStack>
                {items.map((item, index) => {
                  const selected = selectedIndex === index;
                  return (
                    <Box
                      backgroundColor={selected ? "blue.600" : "whiteAlpha.50"}
                      color={selected ? "white" : undefined}
                      onMouseOver={() => setSelectedIndex(index)}
                      borderRadius="md"
                      w="full"
                      key={index}
                      cursor="pointer"
                      overflow="hidden"
                      shadow="base"
                      flexShrink={0}
                      ref={selected ? (selectedElementRef as any) : undefined}
                      onClick={() => {
                        window.open(item.url, "_blank");
                      }}
                    >
                      <Flex>
                        <Box w={16}>
                          <Image
                            src={item.image || ""}
                            fallback={
                              <Center bg="blackAlpha.100" h="full" w="full">
                                <ViewOffIcon />
                              </Center>
                            }
                          />
                        </Box>
                        <Flex
                          justifyContent="space-between"
                          direction="column"
                          p={4}
                        >
                          <Text fontWeight="semibold">{item.title}</Text>
                          <Box>
                            <Badge
                              size="sm"
                              fontSize="0.6em"
                              variant="solid"
                              colorScheme={
                                item.type === "Sonarr" ? "blue" : "orange" // TODO: Fix this
                              }
                            >
                              {item.type}
                            </Badge>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
