import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ColorMode } from "@dashboardarr/graphql";
import { useField } from "formik";
import { FunctionComponent } from "react";

interface ColorModeSliderProps {
  name: string;
}

export const ColorModeSlider: FunctionComponent<ColorModeSliderProps> = ({
  name,
}) => {
  const [{ onChange }, { value }, { setValue }] = useField<ColorMode>({ name });

  const { bgColor } = useColorModeValue(
    { bgColor: "gray.300" },
    { bgColor: "whiteAlpha.400" }
  );

  const handleClick = () => {
    if (value === ColorMode.Light) {
      setValue(ColorMode.Auto);
    } else if (value === ColorMode.Auto) {
      setValue(ColorMode.Dark);
    } else {
      setValue(ColorMode.Light);
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
            value === ColorMode.Auto
              ? "12px"
              : value === ColorMode.Dark
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
          {value === ColorMode.Light ? (
            <SunIcon color="black" />
          ) : value === ColorMode.Dark ? (
            <MoonIcon color="black" />
          ) : (
            "A"
          )}
        </Flex>
      </Box>
    </>
  );
};
