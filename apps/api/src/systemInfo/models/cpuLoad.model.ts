import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SystemLoadItem {
  @Field()
  time: Date;

  @Field()
  value: number;
}
