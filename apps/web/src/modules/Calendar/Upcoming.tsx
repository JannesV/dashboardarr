import { Box, Heading, StackDivider, Text, VStack } from "@chakra-ui/react";
import {
  MovieCalendarItem,
  TvCalendarItem,
  useGetCalendarQuery,
} from "@dashboardarr/graphql";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  parse,
  parseISO,
  startOfDay,
} from "date-fns";
import { FunctionComponent } from "react";
import { MovieItem } from "./CalendarDay/MovieItem";
import { TvItem } from "./CalendarDay/TvItem";

interface UpcomingProps {}

export const Upcoming: FunctionComponent<UpcomingProps> = () => {
  const startDate = startOfDay(new Date());
  const endDate = addDays(startOfDay(new Date()), 7);

  const { data, error } = useGetCalendarQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  });

  const items = Object.entries(
    (data?.calendar || []).reduce<
      Record<string, (MovieCalendarItem | TvCalendarItem)[]>
    >((prev, cur) => {
      if (cur.__typename === "MovieCalendarItem") {
        if (cur.digitalDate) {
          const key = format(parseISO(cur.digitalDate), "dd-MM-yyyy");
          (prev[key] = prev[key] || []).push(cur);
        }

        if (cur.inCinemasDate) {
          const key = format(parseISO(cur.inCinemasDate), "dd-MM-yyyy");
          (prev[key] = prev[key] || []).push(cur);
        }
      }

      if (cur.__typename === "TvCalendarItem") {
        const key = format(parseISO(cur.airDate), "dd-MM-yyyy");
        (prev[key] = prev[key] || []).push(cur);
      }

      return prev;
    }, {})
  )
    .filter(([date]) => {
      const parsed = parse(date, "dd-MM-yyyy", new Date());

      return isAfter(parsed, new Date()) && isBefore(parsed, endDate);
    })
    .sort(([aDate], [bDate]) =>
      isBefore(
        parse(aDate, "dd-MM-yyyy", new Date()),
        parse(bDate, "dd-MM-yyyy", new Date())
      )
        ? -1
        : 1
    );

  return (
    <>
      <Heading my={4} size="md">
        Upcoming
      </Heading>
      <Box
        height="calc(100% - 370px)"
        overflowX="hidden"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "4px",
            backgroundColor: "rgba(0,0,0,0.1)",
            display: "none",
            borderRadius: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "2px",
          },
        }}
        _hover={{
          "&::-webkit-scrollbar": {
            display: "initial",
          },
        }}
      >
        {items.map(([date, items]) => (
          <Box _notLast={{ mb: 4 }} key={date}>
            <Text
              fontSize="sm"
              borderBottomWidth={1}
              borderBottomColor="blackAlpha.300"
              mb={2}
            >
              {format(parse(date, "dd-MM-yyyy", new Date()), "dd MMMM")}
            </Text>
            <VStack divider={<StackDivider />} spacing={2}>
              {items.map((item, index) => {
                if (item.__typename === "MovieCalendarItem") {
                  return (
                    <MovieItem
                      movie={item}
                      type={item.digitalDate ? "digital" : "cinema"}
                      key={index}
                      small
                    />
                  );
                } else if (item.__typename === "TvCalendarItem") {
                  return <TvItem series={item} key={index} small />;
                }
              })}
            </VStack>
          </Box>
        ))}
      </Box>
    </>
  );
};
