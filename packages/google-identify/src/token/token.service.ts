import { ExchangeTokenPayload, ExchangeTokenResponse } from ".";
import { FirebaseConfigs, GoogleIdentityError, SECURE_TOKEN_API_URL } from "..";

const SECURE_TOKEN_URL = `${SECURE_TOKEN_API_URL}/v1/token`;

export async function googleExchangeToken(
  config: FirebaseConfigs,
  payload: ExchangeTokenPayload
): Promise<ExchangeTokenResponse> {
  const body = new URLSearchParams();
  body.append("grant_type", payload.grant_type);
  body.append("refresh_token", payload.refresh_token);

  const response = await fetch(`${SECURE_TOKEN_URL}?key=${config.apiKey}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new GoogleIdentityError(json);
  }
  return json;
}
