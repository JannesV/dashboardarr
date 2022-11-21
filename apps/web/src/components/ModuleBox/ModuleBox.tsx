import { Box, BoxProps, useColorModeValue, forwardRef } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface ModuleBoxProps extends PropsWithChildren, BoxProps {}

export const ModuleBox = forwardRef<BoxProps, "div">(
  ({ children, ...boxProps }, ref) => {
    const { border, bgColor } = useColorModeValue(
      { border: "gray.200", bgColor: "white" },
      { border: "gray.700", bgColor: "gray.800" }
    );
    return (
      <Box
        className="grid-stack-item-content"
        shadow="base"
        rounded={10}
        alignItems="center"
        justifyContent="center"
        border="1px"
        bgColor={bgColor}
        borderColor={border}
        p={3}
        ref={ref}
        {...boxProps}
      >
        {children}
      </Box>
    );
  }
);
