import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import {
  CalendarWeekStart,
  useGetCalendarQuery,
  useGetConfigQuery,
} from "@dashboardarr/graphql";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfWeek,
  sub,
} from "date-fns";
import { endOfWeek } from "date-fns/esm";
import { FunctionComponent, useState } from "react";
import { ModuleBox } from "../ModuleBox/ModuleBox";
import { CalendarDay } from "./CalendarDay/CalendarDay";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CalendarProps {}

export const Calendar: FunctionComponent<CalendarProps> = () => {
  const { data: configData } = useGetConfigQuery({
    variables: { configName: "default" },
  });

  const weekStart =
    configData?.config.modules.calendar?.weekStart || CalendarWeekStart.Monday;

  const [month, setMonth] = useState(startOfMonth(new Date()));

  const startDate = startOfWeek(month, {
    weekStartsOn: weekStart === CalendarWeekStart.Monday ? 1 : 0,
  });
  const endDate = endOfWeek(endOfMonth(month));

  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const { data, error } = useGetCalendarQuery({
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  });

  return (
    <ModuleBox width="360px">
      <Flex justifyContent="center" mb="4">
        <Button
          variant="ghost"
          onClick={() => setMonth(sub(month, { months: 1 }))}
        >
          <ChevronLeftIcon />
        </Button>
        <Box w="200px" textAlign="center">
          <Text as="b" fontSize="base">
            {format(month, "LLLL")}
          </Text>

          <Text fontSize="sm">{format(month, "yyyy")}</Text>
        </Box>
        <Button
          variant="ghost"
          onClick={() => setMonth(add(month, { months: 1 }))}
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
      <Grid
        templateColumns="repeat(7, 40px)"
        gridGap={2}
        alignItems="center"
        justifyItems="center"
      >
        {weekStart === CalendarWeekStart.Sunday && <Flex>Zo</Flex>}
        <Flex>Ma</Flex>
        <Flex>Di</Flex>
        <Flex>Wo</Flex>
        <Flex>Do</Flex>
        <Flex>Vr</Flex>
        <Flex>Za</Flex>
        {weekStart === CalendarWeekStart.Monday && <Flex>Zo</Flex>}
        {dates.map((date) => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            calendarItems={data?.calendar || []}
            selectedMonth={month}
          />
        ))}
      </Grid>
      {error && (
        <Alert borderRadius="md" status="error" mt={4}>
          <AlertIcon />
          <AlertDescription>
            Something went wrong while fetching calendar items.
          </AlertDescription>
        </Alert>
      )}
    </ModuleBox>
  );
};
