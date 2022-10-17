import { ButtonModuleInput } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";
import { ServicesList } from "../../SettingsDrawer/ServiceList/ServicesList";

interface ButtonModuleStepProps {
  onChange(module: Partial<ButtonModuleInput>): void;
  module: Partial<ButtonModuleInput>;
}

export const ButtonModuleStep: FunctionComponent<ButtonModuleStepProps> = ({
  onChange,
  module,
}) => {
  return (
    <ServicesList
      onItemClick={({ id }) =>
        onChange({
          serviceId: id,
        })
      }
      selectedItemId={module.serviceId}
    />
  );
};
