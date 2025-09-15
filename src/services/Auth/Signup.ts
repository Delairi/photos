import { signUp } from "aws-amplify/auth";
import type { AuthProps } from "./Auth.interface";

export async function AuthSignup({ username, password, email, name }: AuthProps) {
    await signUp({
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