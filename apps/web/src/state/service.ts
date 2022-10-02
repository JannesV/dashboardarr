import { atom } from "jotai";

export const editServiceAtom = atom<undefined | string>(undefined);

export const createServiceAtom = atom<boolean>(false);
