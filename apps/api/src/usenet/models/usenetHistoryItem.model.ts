import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UsenetHistoryItem {
  @Field()
  name: string;

  /**
   * Size in bytes
   */
  @Field()
  size: number;

  @Field()
  id: string;

  @Field()
  time: number;

  @Field()
  completedOn: Date;

  /**
   * Time it took to download
   */
  @Field()
  completedIn: number;
}
