import { ModuleType } from "@dashboardarr/common";
import { ObjectType } from "@nestjs/graphql";
import { ModuleItem } from "src/configs/models/moduleItem.model";
import { ModulePosition } from "src/configs/models/modulePosition.model";

@ObjectType({
  implements: () => [ModuleItem],
})
export class SystemInfoModule implements ModuleItem {
  id: string;
  type: ModuleType;
  position: ModulePosition;
}
