import { Flex, Heading, Tag, Box, Image, Text } from "@chakra-ui/react";
import { MovieCalendarItem } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";

interface MovieItemProps {
  movie: MovieCalendarItem;
}

export const MovieItem: FunctionComponent<MovieItemProps> = ({ movie }) => {
  return (
    <Flex w="full">
      <Image w="100px" alignSelf="flex-start" src={movie.poster || ""} />
      <Box pl={3}>
        <Heading size="md">{movie.movieTitle}</Heading>

        <Flex my={2}>
          {movie.genres.map((g) => (
            <Tag
              key={g}
              textTransform="uppercase"
              fontSize="x-small"
              size={"sm"}
              mr={2}
              whiteSpace="nowrap"
            >
              {g}
            </Tag>
          ))}
        </Flex>
        <Text fontSize="xs">{movie.overview}</Text>
      </Box>
    </Flex>
  );
};
