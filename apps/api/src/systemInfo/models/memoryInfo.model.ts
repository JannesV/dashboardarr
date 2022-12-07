import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MemoryInfo {
  @Field()
  totalMemory: number;

  @Field()
  usedMemory: number;
}
