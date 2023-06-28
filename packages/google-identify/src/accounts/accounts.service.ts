import { GoogleIdentityError } from "../error";
import { IDENTIFY_TOOLKIT_URL } from "../google-identify.const";
import type { FirebaseConfigs } from "../google-identify.types";
import type {
  GetAccountInfoResponse,
  LookUpPayload,
  SignInWithPasswordPayload,
  SignUpPayload,
  SignUpResponse,
  VerifyPasswordResponse,
} from "./accounts.types";

const ACCOUNT_URL = `${IDENTIFY_TOOLKIT_URL}/v1/accounts`;

export async function googleAccountLookUp(
  config: FirebaseConfigs,
  payload: LookUpPayload,
): Promise<GetAccountInfoResponse> {
  const response = await fetch(`${ACCOUNT_URL}:lookup?key=${config.apiKey}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new GoogleIdentityError(json);
  }
  return json;
}

export async function googleAccountSignInWithPassword(
  config: FirebaseConfigs,
  payload: SignInWithPasswordPayload,
): Promise<VerifyPasswordResponse> {
  const response = await fetch(`${ACCOUNT_URL}:signInWithPassword?key=${config.apiKey}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new GoogleIdentityError(json);
  }
  return json;
}

export async function googleAccountSignUp(
  config: FirebaseConfigs,
  payload: SignUpPayload,
): Promise<SignUpResponse> {
  const response = await fetch(`${ACCOUNT_URL}:signInWithPassword?key=${config.apiKey}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new GoogleIdentityError(json);
  }
  return json;
}
