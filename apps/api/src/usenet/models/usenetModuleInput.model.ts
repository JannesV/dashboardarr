import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UsenetModuleInput {
  @Field()
  serviceId: string;
}
