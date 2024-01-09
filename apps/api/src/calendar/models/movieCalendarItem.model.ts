import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MovieCalendarItem {
  @Field()
  movieTitle: string;

  @Field({ nullable: true })
  inCinemasDate?: Date;

  @Field({ nullable: true })
  digitalDate?: Date;

  @Field({ nullable: true })
  imdbId?: string;

  @Field({ nullable: true })
  poster?: string;

  @Field((type) => [String])
  genres: string[];

  @Field()
  overview: string;

  @Field({ nullable: true })
  voteAverage?: number;
}
