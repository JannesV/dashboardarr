import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TvCalendarItem {
  @Field()
  seriesTitle: string;

  @Field()
  episodeTitle: string;

  @Field()
  overview: string;

  @Field()
  airDate: Date;

  @Field()
  seasonNumber: number;

  @Field()
  episodeNumber: number;

  @Field()
  tvDbId: string;

  @Field({ nullable: true })
  imdbId?: string;

  @Field({ nullable: true })
  poster?: string;

  @Field((type) => [String])
  genres: string[];
}
