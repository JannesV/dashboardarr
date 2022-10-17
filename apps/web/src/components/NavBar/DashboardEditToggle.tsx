import { Badge, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { VscEditorLayout } from "react-icons/vsc";
import { MdClose, MdDone } from "react-icons/md";
import { useAtom } from "jotai";
import { editDashboardModulesAtom } from "../../state/module";

interface DashboardEditToggleProps {}

export const DashboardEditToggle: FunctionComponent<
  DashboardEditToggleProps
> = () => {
  const [isEditting, setIsEditting] = useAtom(editDashboardModulesAtom);

  return !isEditting ? (
    <Tooltip
      hasArrow
      placement="bottom-end"
      label="Edit the size and position of modules"
    >
      <IconButton
        aria-label="Edit module layout"
        icon={<Icon fontSize={20} as={VscEditorLayout} />}
        onClick={() => setIsEditting(!isEditting)}
        variant="solid"
      />
    </Tooltip>
  ) : (
    <HStack>
      <Badge fontSize="0.8em" variant="solid" size="lg" colorScheme="green">
        Dashboard Edit Mode
      </Badge>
      <IconButton
        aria-label="Cancel"
        onClick={() => setIsEditting(false)}
        icon={<Icon as={MdDone} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Cancel"
        onClick={() => setIsEditting(false)}
        icon={<Icon as={MdClose} />}
        colorScheme="red"
      />
    </HStack>
  );
};
