import {
  Popover,
  PopoverTrigger,
  Flex,
  HStack,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack,
  StackDivider,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { MovieCalendarItem, TvCalendarItem } from "@dashboardarr/graphql";
import { isSameDay, parseISO, isSameMonth, getDate, isToday } from "date-fns";
import { FunctionComponent } from "react";
import { MovieItem } from "./MovieItem";
import { TvItem } from "./TvItem";

interface CalendarDayProps {
  date: Date;
  selectedMonth: Date;
  calendarItems: (TvCalendarItem | MovieCalendarItem)[];
}

export const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  date,
  calendarItems,
  selectedMonth,
}) => {
  const { hoverColor } = useColorModeValue(
    { hoverColor: "gray.100" },
    { hoverColor: "gray.700" }
  );

  const movieItems = calendarItems.filter(
    (m) =>
      m.__typename === "MovieCalendarItem" &&
      ((m.digitalDate && isSameDay(date, parseISO(m.digitalDate))) ||
        (m.inCinemasDate && isSameDay(date, parseISO(m.inCinemasDate))))
  ) as MovieCalendarItem[];

  const tvItems = calendarItems.filter(
    (m) =>
      m.__typename === "TvCalendarItem" && isSameDay(date, parseISO(m.airDate))
  ) as TvCalendarItem[];

  const hasItems = !!movieItems?.length || !!tvItems?.length;

  return (
    <Popover
      isOpen={hasItems ? undefined : false}
      trigger="hover"
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Flex
          _hover={{ backgroundColor: hoverColor }}
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          h="40px"
          w="40px"
          opacity={isSameMonth(date, selectedMonth) ? 1 : 0.3}
          cursor="pointer"
          pos="relative"
          borderColor={isToday(date) ? "blue.400" : undefined}
          borderWidth={isToday(date) ? 1 : 0}
        >
          {getDate(date)}
          <HStack
            spacing="2px"
            justifyContent="center"
            pos="absolute"
            bottom="5px"
            left="5px"
            right="5px"
          >
            {!!tvItems?.length && (
              <Box
                w="5px"
                h="5px"
                backgroundColor="blue.400"
                borderRadius="full"
              />
            )}
            {!!movieItems?.length && (
              <Box
                w="5px"
                h="5px"
                backgroundColor="yellow.400"
                borderRadius="full"
              />
            )}
          </HStack>
        </Flex>
      </PopoverTrigger>
      <PopoverContent w="400px">
        <PopoverArrow />
        <PopoverBody>
          <VStack
            maxH="450px"
            overflowX="hidden"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255,255,255,0.4)",
                borderRadius: "4px",
              },
            }}
            divider={<StackDivider />}
            spacing={3}
            p={2}
          >
            {movieItems?.map((item, index) => (
              <MovieItem
                movie={item}
                type={
                  item.inCinemasDate &&
                  isSameDay(date, parseISO(item.inCinemasDate))
                    ? "cinema"
                    : "digital"
                }
                key={index}
              />
            ))}

            {tvItems?.map((item, index) => (
              <TvItem series={item} key={index} />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
