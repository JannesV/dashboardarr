import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { forwardRef, PropsWithChildren } from "react";

interface ModuleBoxProps extends PropsWithChildren, BoxProps {}

export const ModuleBox = forwardRef<any, ModuleBoxProps>(
  ({ children, ...boxProps }, ref) => {
    const { border, bgColor } = useColorModeValue(
      { border: "gray.200", bgColor: "white" },
      { border: "gray.700", bgColor: "whiteAlpha.100" }
    );
    return (
      <Box
        shadow="md"
        rounded={15}
        alignItems="center"
        justifyContent="center"
        border="1px"
        bgColor={bgColor}
        borderColor={border}
        p="4"
        ref={ref}
        {...boxProps}
      >
        {children}
      </Box>
    );
  }
);
