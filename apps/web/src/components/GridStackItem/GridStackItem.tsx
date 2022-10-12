import { Box } from "@chakra-ui/react";
import { ModulePosition } from "@dashboardarr/graphql";
import { forwardRef, ReactNode } from "react";
import { ModuleBox } from "../ModuleBox/ModuleBox";

interface GridStackItemProps {
  position: ModulePosition;
  id: string;
  children: ReactNode;
}

export const GridStackItem = forwardRef<HTMLDivElement, GridStackItemProps>(
  ({ position, id, children }, ref) => {
    return (
      <Box
        ref={ref}
        className="grid-stack-item"
        gs-id={id}
        gs-x={position.x}
        gs-y={position.y}
        gs-w={position.w}
        gs-h={position.h}
      >
        <ModuleBox className="grid-stack-item-content">{children}</ModuleBox>
      </Box>
    );
  }
);
