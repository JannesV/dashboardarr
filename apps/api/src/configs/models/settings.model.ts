import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Settings {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  favicon?: string;
}
