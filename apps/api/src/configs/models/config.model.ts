import { Field, ObjectType } from "@nestjs/graphql";
import { ModuleItem } from "./moduleItem.model";
import { Settings } from "./settings.model";

@ObjectType()
export class Config {
  @Field()
  name: string;

  @Field(() => Settings)
  settings: Settings;

  @Field(() => [ModuleItem])
  modules: ModuleItem[];
}
