import { Field, ObjectType } from "@nestjs/graphql";
import { ConfigModule } from "./configModule.model";
import { Settings } from "./settings.model";

@ObjectType()
export class Config {
  @Field()
  name: string;

  @Field(() => Settings)
  settings: Settings;

  @Field(() => [ConfigModule])
  modules: ConfigModule[];
}
