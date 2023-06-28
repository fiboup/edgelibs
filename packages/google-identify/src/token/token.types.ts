export type ExchangeTokenPayload = {
  //The refresh token's grant type, always "refresh_token".
  grant_type: string;
  //An Identity Platform refresh token.
  refresh_token: string;
};

export type ExchangeTokenResponse = {
  // The number of seconds in which the ID token expires.
  expires_in: string;
  // The type of the refresh token, always "Bearer".
  token_type: string;
  // The Identity Platform refresh token provided in the request or a new refresh token.
  refresh_token: string;
  // An Identity Platform ID token.
  id_token: string;
  // The uid corresponding to the provided ID token.
  user_id: string;
  // Your Google Cloud project ID.
  project_id: string;
};
