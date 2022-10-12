import { Flex, Heading, Box, Image, Text, Badge } from "@chakra-ui/react";
import { TvCalendarItem } from "@dashboardarr/graphql";
import { format, parseISO } from "date-fns";
import { FunctionComponent } from "react";

interface TvItemProps {
  series: TvCalendarItem;
}

export const TvItem: FunctionComponent<TvItemProps> = ({ series }) => {
  return (
    <Flex w="full">
      <Box w="100px" flexShrink={0} pos="relative">
        <Image
          borderRadius="base"
          alignSelf="flex-start"
          src={series.poster || ""}
        />
        <Badge
          fontSize="x-small"
          colorScheme="blue"
          pos="absolute"
          top={1}
          left={1}
        >
          {format(parseISO(series.airDate), "HH:mm")}
        </Badge>
      </Box>
      <Box pl={3}>
        <Heading size="md">{series.seriesTitle}</Heading>
        <Badge my={3} colorScheme="green" size={"sm"} fontSize="x-small">
          S{series.seasonNumber} E{series.episodeNumber} - {series.episodeTitle}
        </Badge>

        <Text noOfLines={5} fontSize="xs">
          {series.overview}
        </Text>
      </Box>
    </Flex>
  );
};
