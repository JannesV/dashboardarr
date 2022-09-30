import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SettingsInput {
  @Field()
  searchUrl: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  favicon?: string;

  @Field(() => String, { nullable: true })
  primaryColor?: string;

  @Field(() => String, { nullable: true })
  secondaryColor?: string;

  @Field(() => String, { nullable: true })
  primaryShade?: string;

  @Field({ nullable: true })
  background?: string;

  @Field({ nullable: true })
  customCSS?: string;

  @Field({ nullable: true })
  appOpacity?: number;

  @Field({ nullable: true })
  widgetPosition?: string;

  @Field({ nullable: true })
  appCardWidth?: number;
}
