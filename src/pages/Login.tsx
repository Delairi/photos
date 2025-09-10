import InputText from "../components/Inputs/InputText"
import { AuthLogin } from "../services/Auth/Login";
const Login = () => {


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        if (typeof username === "string" && typeof password === "string") {
            AuthLogin({ username, password });
            
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <form
                onSubmit={onSubmit}
                className="shadow-2xl rounded-2xl w-full max-w-sm bg-white p-10 flex flex-col gap-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign In</h2>
                <div className="flex flex-col gap-5">
                    <InputText name="username" label="Username" />
                    <InputText name="password" label="Password" type="password" />
                </div>
                <button
                    type="submit"
                    className="mt-3 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login