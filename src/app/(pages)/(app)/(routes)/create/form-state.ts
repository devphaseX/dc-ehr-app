import { create } from "zustand";
import { CreateNewResource } from "./new/schema";

type Resource = CreateNewResource;

type CreateNewResourceStore = {
  post?: Resource | null;
  setPost: (post: Resource | null) => void;
};

export const useNewResourceStore = create<CreateNewResourceStore>((set) => ({
  setPost: (post) => {
    set({ post });
  },
}));
