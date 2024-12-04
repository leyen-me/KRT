import { create } from "zustand";
import { SysDictAllResponseType } from "@app/server/src/model";

export type DictStore = {
  dictList: SysDictAllResponseType;
  setDictList: (dictList: SysDictAllResponseType) => void;
};

const useDictStore = create<DictStore>((set) => ({
  dictList: [],
  setDictList: (dictList: SysDictAllResponseType) => {
    set({ dictList });
  },
}));

export { useDictStore };
