import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ButtonModuleInput {
  @Field()
  serviceId: string;
}
