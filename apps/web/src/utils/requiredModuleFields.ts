import { ModuleItemInput } from "@dashboardarr/graphql";

export const requiredModuleFields: {
  [K in keyof ModuleItemInput]-?: (keyof NonNullable<ModuleItemInput[K]>)[];
} = {
  button: ["serviceId"],
  calendar: ["startOfWeek"],
  usenet: ["serviceId"],
  systemInfo: [],
};

export const hasRequiredFields = (
  module: ModuleItemInput,
  type: keyof ModuleItemInput
) =>
  !requiredModuleFields[type].some((f) => {
    const fieldValue = (module[type] as any)?.[f];

    return !fieldValue;
  });
