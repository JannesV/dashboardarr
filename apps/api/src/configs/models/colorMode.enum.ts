import { registerEnumType } from "@nestjs/graphql";

export enum ColorMode {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

registerEnumType(ColorMode, { name: "ColorMode" });
