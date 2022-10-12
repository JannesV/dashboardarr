import { ModuleType } from "@dashboardarr/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { ModuleItem } from "src/configs/models/moduleItem.model";
import { ModulePosition } from "src/configs/models/modulePosition.model";
import { Service } from "src/services/models/service.model";

@ObjectType({
  implements: () => [ModuleItem],
})
export class UsenetModule implements ModuleItem {
  id: string;
  type: ModuleType;
  position: ModulePosition;

  serviceId: string;

  @Field(() => Service)
  service: Service;
}
