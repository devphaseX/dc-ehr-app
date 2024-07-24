import { create } from "zustand";
import { CreateNewResource } from "./new/schema";

type Resource = Omit<CreateNewResource, "images"> & { images: Array<string> };

type CreateNewResourceStore = {
  post?: Resource | null;
  setPost: (post: Resource | null) => void;
};

export const useNewResourceStore = create<CreateNewResourceStore>((set) => ({
  setPost: (post) => {
    set({ post });
  },
}));
