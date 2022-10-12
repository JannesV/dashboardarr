import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ModulePositionInput {
  @Field()
  id: string;

  @Field()
  x: number;

  @Field()
  y: number;

  @Field({ nullable: true })
  w?: number;

  @Field({ nullable: true })
  h?: number;
}
