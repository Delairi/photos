import { signIn } from "aws-amplify/auth";
import type { AuthProps } from "./Auth.interface";

export function AuthLogin({ username, password }: Pick<AuthProps, 'username' | 'password'>) {
    signIn({
        username,
        password
    })
}