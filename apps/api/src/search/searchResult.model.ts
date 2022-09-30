import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SearchResult {
  @Field({ nullable: true })
  image?: string;

  @Field()
  title: string;

  @Field()
  type: string;
}
