import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SystemInfoModuleInput {
  @Field()
  test: boolean;
}
