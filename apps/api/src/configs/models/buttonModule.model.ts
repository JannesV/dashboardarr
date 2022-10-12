import { Field, ObjectType } from "@nestjs/graphql";
import { Service } from "src/services/models/service.model";
import { ModuleItem, ModuleType } from "./moduleItem.model";
import { ModulePosition } from "./modulePosition.model";

@ObjectType({
  implements: () => [ModuleItem],
})
export class ButtonModule implements ModuleItem {
  id: string;
  type: ModuleType;
  position: ModulePosition;

  serviceId: string;

  @Field(() => Service)
  service: Service;
}
