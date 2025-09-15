interface InputTextProps {
    label?: string,
    type?: string,
    name: string
}
const InputText = ({ label, type = 'text', name }: InputTextProps) => {
    return (
        <label className="flex flex-col gap-2">
            {label}
            <input type={type} className="p-1 shadow-md outline-0" name={name} />
        </label>
    )
}

export default InputText