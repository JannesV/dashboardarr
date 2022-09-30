import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { FunctionComponent, PropsWithChildren } from 'react';

interface ModuleBoxProps extends PropsWithChildren, BoxProps {}
export const ModuleBox: FunctionComponent<ModuleBoxProps> = ({ children, ...boxProps }) => {
  const { border } = useColorModeValue({ border: 'gray.200' }, { border: 'gray.700' });

  return (
    <Box
      shadow="md"
      rounded="20"
      alignItems="center"
      justifyContent="center"
      border="1px"
      borderColor={border}
      m="4"
      p="4"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
