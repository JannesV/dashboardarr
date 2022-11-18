import { Flex, Heading, Box, Image, Text, Badge } from "@chakra-ui/react";
import { TvCalendarItem } from "@dashboardarr/graphql";
import { format, parseISO } from "date-fns";
import { FunctionComponent } from "react";

interface TvItemProps {
  series: TvCalendarItem;
  small?: boolean;
}

export const TvItem: FunctionComponent<TvItemProps> = ({ series, small }) => {
  return (
    <Flex w="full">
      <Box w={small ? "60px" : "100px"} flexShrink={0} pos="relative">
        <Image
          borderRadius="base"
          alignSelf="flex-start"
          src={series.poster || ""}
        />
        <Badge
          fontSize="x-small"
          pos="absolute"
          variant="solid"
          top={1}
          left={1}
          background="blue.700"
        >
          {format(parseISO(series.airDate), "HH:mm")}
        </Badge>
      </Box>
      <Box pl={3}>
        <Heading size={small ? "xs" : "md"}>{series.seriesTitle}</Heading>
        <Badge my={3} colorScheme="green" size={"sm"} fontSize="x-small">
          S{series.seasonNumber} E{series.episodeNumber} - {series.episodeTitle}
        </Badge>

        {!small && (
          <Text noOfLines={5} fontSize="xs">
            {series.overview}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
