import type { GetCurrentUserOutput } from "aws-amplify/auth";
import { create } from "zustand";

interface StoreProps {
    user: GetCurrentUserOutput | null;
    setUser: (value: GetCurrentUserOutput | null) => void;
}

const useStore = create<StoreProps>((set) => ({
    user: null,
    setUser: (value: GetCurrentUserOutput | null) => set({ user: value }),
}));

export default useStore