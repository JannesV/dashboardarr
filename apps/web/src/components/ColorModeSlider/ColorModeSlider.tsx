import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

interface ColorModeSliderProps {}

export const ColorModeSlider: FunctionComponent<ColorModeSliderProps> = () => {
  const [mode, setMode] = useState<"dark" | "light" | "auto">("light");
  const { setColorMode } = useColorMode();
  const { bgColor } = useColorModeValue(
    { bgColor: "gray.300" },
    { bgColor: "whiteAlpha.400" }
  );

  const handleClick = () => {
    if (mode === "light") {
      setMode("auto");
    } else if (mode === "auto") {
      setMode("dark");
      setColorMode("dark");
    } else {
      setMode("light");
      setColorMode("light");
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
            mode === "auto" ? "12px" : mode === "dark" ? "24px" : 0
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
          {mode === "light" ? (
            <SunIcon color="black" />
          ) : mode === "dark" ? (
            <MoonIcon color="black" />
          ) : (
            "A"
          )}
        </Flex>
      </Box>
    </>
  );
};
