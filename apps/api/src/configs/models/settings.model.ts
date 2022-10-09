import { Field, ObjectType } from "@nestjs/graphql";
import { ColorMode } from "./colorMode.enum";

@ObjectType()
export class Settings {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  favicon?: string;

  @Field(() => ColorMode)
  colorMode: ColorMode;
}
