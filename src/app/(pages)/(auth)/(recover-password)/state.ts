import { create } from 'zustand';

type ResetPasswordStage = 'check-id' | 'security-questions' | 'change-password';

type ResetPasswordState = {
  stage?: ResetPasswordStage;
  setStage: (stage: ResetPasswordStage) => void;
  state?: { email?: string };
  setEmail: (email: string | null) => void;
};

export const useResetPasswordState = create<ResetPasswordState>((set, get) => ({
  stage: 'security-questions',
  setStage: (stage) => {
    set({ stage });
  },

  setEmail: (email) => {
    const state = { ...get().state };
    state.email = email === null ? '' : email;
    set({ state });
  },
}));
