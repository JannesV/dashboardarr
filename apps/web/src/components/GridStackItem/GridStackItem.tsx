import { Box } from "@chakra-ui/react";
import { ModulePosition } from "@dashboardarr/graphql";
import { forwardRef, ReactNode } from "react";
import { ModuleBox } from "../ModuleBox/ModuleBox";

interface GridStackItemProps {
  position: ModulePosition;
  minHeight?: number;
  minWidth?: number;
  id: string;
  children: ReactNode;
}

export const GridStackItem = forwardRef<HTMLDivElement, GridStackItemProps>(
  ({ position, id, minHeight, minWidth, children }, ref) => {
    return (
      <Box
        ref={ref}
        className="grid-stack-item"
        gs-id={id}
        gs-x={position.x}
        gs-y={position.y}
        gs-w={position.w}
        gs-h={position.h}
        gs-min-h={minHeight}
        gs-min-w={minWidth}
      >
        <ModuleBox className="grid-stack-item-content">{children}</ModuleBox>
      </Box>
    );
  }
);
