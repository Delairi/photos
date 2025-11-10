import { useState } from "react";
import { CloseImage, FolderImage, FolderPlusImage } from "../Images";

interface PreviewPopupProps {
    url: string;
    close: () => void;
}
const PreviewPopup = ({ url, close }: PreviewPopupProps) => {

    const [isFolderAdded, setIsFolderAdded] = useState(false)

    const addFolder = () => {
        setIsFolderAdded(!isFolderAdded)
    }
    return (
        <div className="fixed inset-0 bg-[#0a0a0aa4] flex items-center justify-center w-screen h-screen">
            <div className="flex items-start rounded-xl">
                <div className="absolute top-10 right-10 gap-4 flex items-center">
                    <button onClick={addFolder} className="cursor-pointer">
                        {
                            isFolderAdded ?
                                <FolderPlusImage fill="white" width="8" height="8" />
                                :
                                <FolderImage fill="white" width="8" height="8" />
                        }
                    </button>
                    <button onClick={close} className="cursor-pointer">
                        <CloseImage fill="white" width="8" height="8" />
                    </button>
                </div>
                <div className="flex flex-col relative w-full items-center gap-5">
                    <div className="flex flex-col w-full items-center">
                        <img className="w-2/3 h-auto" src={url} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewPopup