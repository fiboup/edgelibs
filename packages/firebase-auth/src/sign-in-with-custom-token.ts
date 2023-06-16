import { FirebaseAuthConfig } from "./config";
import { IdentityError, IdentityErrorResponse } from "./error";

export type SignInWithCustomTokenPayload = {
  token: string;
};

export type SignInWithCustomTokenResponse = {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
};

export const signInWithCustomToken =
  (config: FirebaseAuthConfig) =>
  async (
    payload: SignInWithCustomTokenPayload
  ): Promise<SignInWithCustomTokenResponse> => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${config.apiKey}`,
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
    return json as SignInWithCustomTokenResponse;
  };
