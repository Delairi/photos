import type { GetCurrentUserOutput } from "aws-amplify/auth";
import { create } from "zustand";

interface StoreProps {
    user: GetCurrentUserOutput | null;
    setUser: (value: GetCurrentUserOutput | null) => void;
    images: any;
    setImages: (value: any) => void;
}


const useStore = create<StoreProps>((set) => ({
    user: null,
    setUser: (value: GetCurrentUserOutput | null) => set({ user: value }),
    images: null,
    setImages: (value: any) => set({ images: value })
}));

export default useStore