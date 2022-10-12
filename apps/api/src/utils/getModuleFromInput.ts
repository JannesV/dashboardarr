import { ModuleSizeContraints, SizeConstraint } from "@dashboardarr/common";
import { ModuleItemInput } from "src/configs/models/moduleItemInput.model";

export const getModuleFromInput = <T extends keyof ModuleItemInput>(
  input: ModuleItemInput
): {
  type: T;
  module: ModuleItemInput[T];
  constraint: SizeConstraint;
} => {
  const [type, module] = Object.entries(input).find(([k, v]) => !!v);

  return {
    constraint: ModuleSizeContraints[type],
    type: type as T,
    module,
  };
};
