import { UsenetModuleInput } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";
import { ServicesList } from "../../SettingsDrawer/ServiceList/ServicesList";

interface UsenetModuleStepProps {
  onChange(module: Partial<UsenetModuleInput>): void;
  module: Partial<UsenetModuleInput>;
}

export const UsenetModuleStep: FunctionComponent<UsenetModuleStepProps> = ({
  module,
  onChange,
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
