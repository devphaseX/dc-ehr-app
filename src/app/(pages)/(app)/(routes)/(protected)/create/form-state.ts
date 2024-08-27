import { create } from "zustand";
import { NewResource } from "./new/schema";

export type Resource = Omit<NewResource, "files"> & {
  files: Array<string>;
};

type CreateNewResourceStore = {
  post?: Resource | null;
  setPost: (post: Resource | null) => void;
};

export const useNewResourceStore = create<CreateNewResourceStore>((set) => ({
  setPost: (post) => {
    set({ post });
  },
}));
