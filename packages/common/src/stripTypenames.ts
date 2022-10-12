import { produce } from "immer";

export const stripTypenames = <K>(input: K): K => {
  const removeName = (draft: any) => {
    for (const key in draft) {
      if (key === "__typename") {
        delete draft[key];
      } else if (typeof draft[key] === "object") {
        draft[key] = stripTypenames(draft[key]);
      }
    }
  };

  return produce(input, (draft) => {
    removeName(draft);
  });
};
