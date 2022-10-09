import { produce } from "immer";

export const stripTypenames = (input: object) => {
  return produce(input, (draft) => {
    Object.entries(input).forEach(([key, value]) => {
      if (key === "__typename") {
        delete input["__typename"];
      } else if (value && typeof value === "object") {
        stripTypenames(value);
      }
    });
  });
};
