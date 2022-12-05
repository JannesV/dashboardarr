import { ModuleType } from "./moduleTypeEnum";

export const CURRENT_VERSION = "v0.1";
export const GRID_COLUMNS = 6;

export interface SizeConstraint {
  minWidth: number;
  minHeight: number;
}

export const ModuleSizeContraints: Record<ModuleType, SizeConstraint> = {
  button: {
    minHeight: 1,
    minWidth: 1,
  },
  calendar: {
    minHeight: 3,
    minWidth: 1,
  },
  usenet: {
    minHeight: 2,
    minWidth: 3,
  },
  systemInfo: {
    minWidth: 1,
    minHeight: 2,
  },
};
