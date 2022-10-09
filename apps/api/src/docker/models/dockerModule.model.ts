import { ObjectType } from "@nestjs/graphql";
import {
  ConfigModule,
  ModuleType,
} from "../../configs/models/configModule.model";

@ObjectType({
  implements: () => [ConfigModule],
})
export class DockerModule implements ConfigModule {
  id: string;

  enabled: boolean;

  type: ModuleType;
}
