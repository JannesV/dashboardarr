import { Flex, Heading, Tag, Box, Image, Text, Badge } from "@chakra-ui/react";
import { MovieCalendarItem } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";

interface MovieItemProps {
  movie: MovieCalendarItem;
  type: "digital" | "cinema";
}

export const MovieItem: FunctionComponent<MovieItemProps> = ({
  movie,
  type,
}) => {
  return (
    <Flex w="full">
      <Box w="100px" flexShrink={0} pos="relative">
        <Image
          borderRadius="base"
          alignSelf="flex-start"
          src={movie.poster || ""}
        />
        <Badge
          fontSize="x-small"
          colorScheme="orange"
          pos="absolute"
          top={1}
          left={1}
        >
          {type}
        </Badge>
      </Box>
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
        <Text noOfLines={5} fontSize="xs">
          {movie.overview}
        </Text>
      </Box>
    </Flex>
  );
};