import type { ReactNode } from "react";

interface PopupProps {
    title: string;
    children: ReactNode;
}
const Popup = ({ title, children }: PopupProps) => {
    return (
        <div className="fixed inset-0 bg-[#0a0a0aa4] flex items-center justify-center w-screen h-screen">
            <div className="flex items-start md:w-1/3 md:h-1/3 bg-white p-5 rounded-xl">
                <div className="flex flex-col relative w-full items-center gap-5">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <div className="flex flex-col w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup