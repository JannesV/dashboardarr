import { FormLabel, Select } from "@chakra-ui/react";
import { CalendarModuleInput, CalendarWeekStart } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";

interface CalendarModuleStepProps {
  onChange(module: Partial<CalendarModuleInput>): void;
  module: Partial<CalendarModuleInput>;
}

export const CalendarModuleStep: FunctionComponent<CalendarModuleStepProps> = ({
  module,
  onChange,
}) => {
  return (
    <>
      <FormLabel>Start of week:</FormLabel>
      <Select
        value={module.startOfWeek}
        onChange={(ev) => {
          onChange({
            startOfWeek: ev.currentTarget.value as CalendarWeekStart,
          });
        }}
        textTransform="capitalize"
      >
        {Object.values(CalendarWeekStart)
          .sort()
          .map((type) => (
            <option key={type} value={type}>
              {type.toLocaleLowerCase()}
            </option>
          ))}
      </Select>
    </>
  );
};
