import { Field, InputType } from "@nestjs/graphql";
import { ColorMode } from "./colorMode.enum";

@InputType()
export class SettingsInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  favicon?: string;

  @Field((type) => ColorMode, { nullable: true })
  colorMode?: ColorMode;
}
