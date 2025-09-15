import { signIn } from "aws-amplify/auth";
import type { AuthProps } from "./Auth.interface";

export async function AuthLogin({ username, password }: Pick<AuthProps, 'username' | 'password'>) {
    await signIn({
        username,
        password
    })
}