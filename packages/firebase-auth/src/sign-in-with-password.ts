import { FirebaseAuthConfig } from "./config";
import { IdentityError, IdentityErrorResponse } from "./error";

export type SignInWithPasswordPayload = {
  email: string;
  password: string;
};

export type VerifyPasswordResponse = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
};

export const signInWithPassword =
  (config: FirebaseAuthConfig) =>
  async (
    payload: SignInWithPasswordPayload
  ): Promise<VerifyPasswordResponse> => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`,
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
    return json as VerifyPasswordResponse;
  };
