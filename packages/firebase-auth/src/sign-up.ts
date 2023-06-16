import { FirebaseAuthConfig } from "./config";
import { IdentityError, IdentityErrorResponse } from "./error";

export type SignUpPayload = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
};

export const signUp =
  (config: FirebaseAuthConfig) =>
  async (payload: SignUpPayload): Promise<SignUpResponse> => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      throw new IdentityError(json as IdentityErrorResponse);
    }
    return json as SignUpResponse;
  };
