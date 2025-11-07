import type { FormEvent } from "react";
import InputText from "../Inputs/InputText"

interface CreateAlbumProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    close: () => void;
}

const CreateAlbum = ({ onSubmit, close }: CreateAlbumProps) => {
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <InputText label="Name" name="album" />
            <div className="flex items-center justify-center fle-row gap-5">
                <button className="px-5 py-2 shadow-md" type="submit">Create</button>
                <button className="px-5 py-2" onClick={close} type="button">Close</button>
            </div>
        </form>
    )
}

export default CreateAlbum