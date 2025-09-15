import { signUp, type SignUpOutput } from "aws-amplify/auth";
import type { AuthProps } from "./Auth.interface";

export async function AuthSignup({ username, password, email, name }: Omit<AuthProps, 'confirmationCode'>): Promise<SignUpOutput> {
    return await signUp({
        username,
        password,
        options: {
            userAttributes: {
                email,
                name
            }
        }
    })
}