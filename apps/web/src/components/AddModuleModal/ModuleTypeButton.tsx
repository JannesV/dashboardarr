import { Flex, Icon, As } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface ModuleTypeButtonProps {
  onClick(): void;
  icon: As;
  label: string;
}

export const ModuleTypeButton: FunctionComponent<ModuleTypeButtonProps> = ({
  onClick,
  icon,
  label,
}) => {
  return (
    <Flex
      p={6}
      w="full"
      bgColor="blackAlpha.200"
      flexDir="column"
      justify="center"
      align="center"
      borderRadius={10}
      cursor="pointer"
      _hover={{ bgColor: "blue.200" }}
      onClick={onClick}
    >
      <Icon mb={2} fontSize={30} as={icon} />
      {label}
    </Flex>
  );
};
