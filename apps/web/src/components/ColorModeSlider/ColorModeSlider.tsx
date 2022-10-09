import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ColorMode } from "@dashboardarr/graphql";
import { FunctionComponent, useState } from "react";

interface ColorModeSliderProps {
  value?: ColorMode;
  onChange(val: ColorMode): void;
}

export const ColorModeSlider: FunctionComponent<ColorModeSliderProps> = ({
  value,
  onChange,
}) => {
  const [mode, setMode] = useState<ColorMode>(value || ColorMode.Auto);
  const { bgColor } = useColorModeValue(
    { bgColor: "gray.300" },
    { bgColor: "whiteAlpha.400" }
  );

  const handleClick = () => {
    if (mode === ColorMode.Light) {
      setMode(ColorMode.Auto);
      onChange(ColorMode.Auto);
    } else if (mode === ColorMode.Auto) {
      setMode(ColorMode.Dark);
      onChange(ColorMode.Dark);
    } else {
      setMode(ColorMode.Light);
      onChange(ColorMode.Light);
    }
  };

  return (
    <>
      <Box
        onClick={handleClick}
        bgColor={bgColor}
        h={6}
        w={12}
        borderRadius="full"
        padding="2px"
        cursor="pointer"
      >
        <Flex
          transform={`translateX(${
            mode === ColorMode.Auto
              ? "12px"
              : mode === ColorMode.Dark
              ? "24px"
              : 0
          })`}
          transition="ease-out"
          transitionDuration="0.2s"
          w={5}
          h={5}
          bgColor="white"
          borderRadius="full"
          justifyContent="center"
          alignItems="center"
          fontSize="xs"
        >
          {mode === ColorMode.Light ? (
            <SunIcon color="black" />
          ) : mode === ColorMode.Dark ? (
            <MoonIcon color="black" />
          ) : (
            "A"
          )}
        </Flex>
      </Box>
    </>
  );
};
