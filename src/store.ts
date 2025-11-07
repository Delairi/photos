import type { GetCurrentUserOutput } from "aws-amplify/auth";
import { create } from "zustand";

interface StoreProps {
    user: GetCurrentUserOutput | null;
    setUser: (value: GetCurrentUserOutput | null) => void;
    images: any;
    setImages: (value: any) => void;
    setIsPopupCreateAlbum: (value: boolean) => void;
    isPopupCreateAlbum: boolean;
}


const useStore = create<StoreProps>((set) => ({
    user: null,
    setUser: (value: GetCurrentUserOutput | null) => set({ user: value }),
    images: null,
    setImages: (value: any) => set({ images: value }),
    isPopupCreateAlbum: false,
    setIsPopupCreateAlbum: (value: boolean) => set({ isPopupCreateAlbum: value})
}));

export default useStore