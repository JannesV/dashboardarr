import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ConfigModule {
  @Field()
  enabled: boolean;
}
