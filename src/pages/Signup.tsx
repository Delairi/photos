import { useNavigate } from "react-router";
import InputText from "../components/Inputs/InputText"
import { AuthSignup } from "../services/Auth/Signup";
import Header from "../layouts/Header";
const Signup = () => {

    const navigation = useNavigate()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");
        const name = formData.get("name");
        if (
            typeof username === "string" &&
            typeof password === "string" &&
            typeof email === "string" &&
            typeof name === "string"
        ) {
            const signup = await AuthSignup({ username, password, email, name });
            if (signup) {
                navigation(`/auth/confirm?username=${username}`)
            }
        }
    }

    return (
        <div>
            <div className="absolute w-full">
                <Header hasBackground={false} />
            </div>
            <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-100 to-gray-300">
                <form
                    onSubmit={onSubmit}
                    className="shadow-2xl rounded-2xl w-full max-w-sm bg-white p-10 flex flex-col gap-2">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create account</h2>
                    <div className="flex flex-col gap-5">
                        <InputText name="name" label="Name" />
                        <InputText name="username" label="Username" />
                        <InputText name="password" label="Password" type="password" />
                        <InputText name="email" label="Email" type="email" />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup