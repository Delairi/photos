import { useNavigate, useSearchParams } from "react-router"
import InputText from "../components/Inputs/InputText"
import { AuthConfirm } from "../services/Auth/Confirm"
import Alert from "../components/Alert/Alert"
import { useState } from "react"

const Confirm = () => {

    const [searchParams] = useSearchParams()
    const [isSuccess, setisSuccess] = useState(false)
    const navigate = useNavigate()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const confirmationCode = form.get('confirmationCode') as string
        const username = searchParams.get('username')
        if (!!username && !!confirmationCode) {
            const verify = await AuthConfirm({ username, confirmationCode })
            if (verify.isSignUpComplete) {
                setisSuccess(true)
                setTimeout(() => {
                    navigate('/auth/login')
                }, 3000);
            }
        }
    }
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <form
                onSubmit={onSubmit}
                className="shadow-2xl rounded-2xl w-full max-w-sm bg-white p-10 flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Verify Your Email</h2>
                {
                    isSuccess && <Alert type="success" message="Your email has been verified. Redirecting in 3 seconds…" />
                }
                <div className="flex flex-col gap-5">
                    <InputText name="confirmationCode" label="Confirmation Code" />
                </div>
                <button
                    type="submit"
                    className="mt-3 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default Confirm