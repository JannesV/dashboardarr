import { Flex, Image, useColorModeValue, useToken } from "@chakra-ui/react";
import { ButtonModule } from "@dashboardarr/graphql";
import { useCallback } from "react";
import { FunctionComponent, useEffect, useRef } from "react";
import { ModuleBox } from "../../components/ModuleBox/ModuleBox";

interface ButtonItemModuleBlockProps {
  item: ButtonModule;
}

export const ButtonItemModuleBlock: FunctionComponent<
  ButtonItemModuleBlockProps
> = ({ item: { service } }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [gray400, whiteAlpha500] = useToken("colors", [
    "blue.400",
    "whiteAlpha.500",
  ]);
  const { gradientColor, borderColor, bgColor } = useColorModeValue(
    {
      gradientColor: "rgba(0, 0, 200, 0.06)",
      borderColor: gray400,
      bgColor: "white",
    },
    {
      gradientColor: "rgba(255, 255, 255, 0.06)",
      borderColor: whiteAlpha500,
      bgColor: "gray.800",
    }
  );

  const handleMouseMove = useCallback((ev: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();

    ref.current!.style.setProperty("--mouse-x", `${ev.clientX - rect.left}px`);
    ref.current!.style.setProperty("--mouse-y", `${ev.clientY - rect.top}px`);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <ModuleBox
      onClick={() => window.open(service.externalUrl || service.url, "_blank")}
      cursor="pointer"
      transition=".2s"
      border="none"
      _hover={{
        shadow: "md",
        _before: {
          opacity: 1,
        },
      }}
      pos="relative"
      _before={{
        borderRadius: "inherit",
        content: `""`,
        height: "100%",
        left: " 0px",
        opacity: 0,
        position: "absolute",
        top: " 0px",
        transition: "opacity 500ms",
        width: "100%",
        background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${gradientColor}, transparent 40%)`,
        zIndex: 3,
      }}
      _after={{
        borderRadius: "inherit",
        content: `""`,
        height: "100%",
        left: "0px",
        opacity: 1,
        position: "absolute",
        top: "0px",
        transition: "opacity 500ms",
        width: "100%",
        background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${borderColor}, transparent 40%)`,
        zIndex: 1,
      }}
      ref={ref}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        transitionDuration="normal"
        direction="column"
        data-id={service.id}
        bgColor={bgColor}
        pos="absolute"
        borderRadius="inherit"
        inset="1px"
        zIndex={2}
        p={3}
      >
        <Image h="full" objectFit="contain" src={`/icons/${service.icon}`} />
      </Flex>
    </ModuleBox>
  );
};
