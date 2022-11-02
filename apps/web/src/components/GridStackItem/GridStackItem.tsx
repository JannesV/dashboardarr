import { Box, BoxProps, Icon } from "@chakra-ui/react";
import {
  GetConfigDocument,
  GetConfigQuery,
  GetConfigQueryVariables,
  ModulePosition,
  useDeleteModuleItemMutation,
} from "@dashboardarr/graphql";
import { GridItemHTMLElement } from "gridstack";
import { useAtomValue } from "jotai";
import { forwardRef } from "react";
import { MdClose } from "react-icons/md";
import { editDashboardModulesAtom } from "../../state/module";
import { useConfig } from "../../utils/useConfig";

interface GridStackItemProps extends BoxProps {
  modulePosition: ModulePosition;
  minModuleHeight?: number;
  minModuleWidth?: number;
  id: string;
}

export const GridStackItem = forwardRef<
  GridItemHTMLElement,
  GridStackItemProps
>(
  (
    { modulePosition, id, minModuleHeight, minModuleWidth, children, ...rest },
    ref
  ) => {
    const { name } = useConfig();

    const [deleteModule] = useDeleteModuleItemMutation({
      variables: {
        configName: name,
        moduleId: id,
      },
      update(cache, { data }) {
        if (data) {
          cache.updateQuery<GetConfigQuery, GetConfigQueryVariables>(
            {
              query: GetConfigDocument,
              variables: { configName: name },
            },
            () => ({
              config: data.deleteModuleItem,
            })
          );
        }
      },
    });

    const isEditMode = useAtomValue(editDashboardModulesAtom);
    return (
      <Box
        ref={ref as any}
        className="grid-stack-item"
        gs-id={id}
        gs-x={modulePosition.x}
        gs-y={modulePosition.y}
        gs-w={modulePosition.w}
        gs-h={modulePosition.h}
        gs-min-h={minModuleHeight}
        gs-min-w={minModuleWidth}
        pos="relative"
      >
        {isEditMode && (
          <Icon
            background="red.400"
            color="white"
            borderRadius="full"
            position="absolute"
            top={1}
            right={1}
            zIndex={4}
            w={5}
            h={5}
            cursor="pointer"
            _hover={{
              bgColor: "red.600",
              shadow: "md",
            }}
            onClick={() => deleteModule()}
            shadow="base"
            as={MdClose}
          />
        )}

        {children}
      </Box>
    );
  }
);
