import { Field, ObjectType } from "@nestjs/graphql";
import { ConfigModule, ModuleType } from "../configs/models/configModule.model";

@ObjectType({
  implements: () => [ConfigModule],
})
export class UsenetModule implements ConfigModule {
  id: string;
  enabled: boolean;
  type: ModuleType;

  @Field()
  serviceId: string;
}
