import { confirmSignUp, type ConfirmSignUpOutput } from "aws-amplify/auth";
import type { AuthProps } from "./Auth.interface";

export async function AuthConfirm({ username, confirmationCode }: Pick<AuthProps, 'username' | 'confirmationCode'>): Promise<ConfirmSignUpOutput> {
    return await confirmSignUp({
        username,
        confirmationCode
    })
}