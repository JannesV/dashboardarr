import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ModulePosition {
  @Field()
  x: number;

  @Field()
  y: number;

  @Field({ nullable: true })
  w?: number;

  @Field({ nullable: true })
  h?: number;
}
