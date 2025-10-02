import { signIn, type SignInOutput } from "aws-amplify/auth";
import type { AuthProps } from "./Auth.interface";

export async function AuthLogin({ username, password }: Pick<AuthProps, 'username' | 'password'>): Promise<SignInOutput> {
        return await signIn({
            username,
            password
        })
}