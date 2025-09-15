export interface AuthProps {
    username: string,
    password: string,
    email: string,
    name: string,
    confirmationCode: string
}

interface CodeDeliveryDetails {
  AttributeName: string;
  DeliveryMedium: string;
  Destination: string;
}

export interface SignupResponse {
  CodeDeliveryDetails: CodeDeliveryDetails;
  UserConfirmed: boolean;
  UserSub: string;
}