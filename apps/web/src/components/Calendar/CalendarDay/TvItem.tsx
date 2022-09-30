import { Flex, Heading, Box, Image, Text, Badge } from "@chakra-ui/react";
import { TvCalendarItem } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";

interface TvItemProps {
  series: TvCalendarItem;
}

export const TvItem: FunctionComponent<TvItemProps> = ({ series }) => {
  return (
    <Flex w="full">
      <Image w="100px" alignSelf="flex-start" src={series.poster || ""} />
      <Box pl={3}>
        <Heading size="md">{series.seriesTitle}</Heading>
        <Badge my={3} colorScheme={"blue"} size={"sm"} fontSize="x-small">
          S{series.seasonNumber} E{series.episodeNumber} - {series.episodeTitle}
        </Badge>

        <Text fontSize="xs">{series.overview}</Text>
      </Box>
    </Flex>
  );
};
