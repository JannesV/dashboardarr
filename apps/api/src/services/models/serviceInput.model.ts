import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import type { FileUpload } from "graphql-upload/GraphQLUpload.js";
import { Field, InputType } from "@nestjs/graphql";
import { ServiceType } from "./serviceType.enum";

@InputType()
export class ServiceInput {
  @Field()
  name: string;

  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => GraphQLUpload, { nullable: true })
  icon?: Promise<FileUpload>;

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
