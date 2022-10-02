import { Field, ObjectType } from "@nestjs/graphql";
import { ServiceType } from "./serviceType.enum";

@ObjectType()
export class Service {
  @Field()
  name: string;

  @Field()
  id: string;

  @Field(() => ServiceType)
  type: ServiceType;

  @Field()
  icon: string;

  /**
   * URL for internal use (API Requests, ....)
   */
  @Field()
  url: string;

  /**
   * URL To open when the service is clicked
   */
  @Field({ nullable: true })
  externalUrl?: string;

  @Field({ nullable: true })
  apiKey?: string;
}
