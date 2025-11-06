import type { FormEvent } from "react";
import InputText from "../Inputs/InputText"

interface CreateAlbumProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CreateAlbum = ({ onSubmit }: CreateAlbumProps) => {
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <InputText label="Name" name="album" />
            <div className="flex items-center justify-center">
                <button className="px-5 py-2 shadow-md">Create</button>
            </div>
        </form>
    )
}

export default CreateAlbum