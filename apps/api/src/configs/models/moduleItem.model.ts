import { Field, InterfaceType } from "@nestjs/graphql";
import { ButtonModule } from "./buttonModule.model";
import { ModulePosition } from "./modulePosition.model";

export enum ModuleType {
  Button = "button",
}

@InterfaceType({
  resolveType(item: ModuleItem) {
    return ButtonModule;
  },
})
export abstract class ModuleItem {
  @Field()
  id: string;

  @Field(() => ModulePosition)
  position: ModulePosition;

  type: ModuleType;
}
