import { CalendarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import { ModuleType } from "@dashboardarr/common";
import { FunctionComponent } from "react";
import { GiButtonFinger } from "react-icons/gi";
import { TbWorldDownload } from "react-icons/tb";
import { ModuleTypeButton } from "./ModuleTypeButton";

interface ModuleTypeSelectorProps {
  onButtonClick(type: ModuleType): void;
}

export const ModuleTypeSelector: FunctionComponent<ModuleTypeSelectorProps> = ({
  onButtonClick,
}) => {
  return (
    <HStack>
      <ModuleTypeButton
        icon={GiButtonFinger}
        label="Button"
        onClick={() => onButtonClick(ModuleType.Button)}
      />
      <ModuleTypeButton
        icon={TbWorldDownload}
        label="Usenet"
        onClick={() => onButtonClick(ModuleType.Usenet)}
      />
      <ModuleTypeButton
        icon={CalendarIcon}
        label="Calendar"
        onClick={() => onButtonClick(ModuleType.Calendar)}
      />
    </HStack>
  );
};
