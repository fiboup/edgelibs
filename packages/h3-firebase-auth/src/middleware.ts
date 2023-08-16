import type { DecodedIdToken } from "@fiboup/firebase-auth";
import { fetchGooglePublicKeys, verifyAndDecodeJwt } from "@fiboup/firebase-auth";
import { createError, defineRequestMiddleware, getHeader } from "h3";

const TOKEN_PREFIX = "Bearer ";
const USER_CONTEXT_KEY = "user";

export type FirebaseAuthConfig = {
  projectId: string;
  transformCurrentUser?: (decodedToken: DecodedIdToken) => unknown;
  /**
   * If you leave not set this value, the default value is `user`.
   * @default user
   */
  userContextKey?: string;
};

export type DefaultFirebaseAuthInjectedVariables = {
  currentUser?: DecodedIdToken;
};

export const transformCurrentUser = (decodedToken: DecodedIdToken) => {
  return decodedToken;
};

export const validateFirebaseAuth = (config: FirebaseAuthConfig) => {
  return defineRequestMiddleware(async (event) => {
    if (!config.projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request: Must provide projectId config",
      });
    }

    const tokenHeader = getHeader(event, "Authorization") || "";
    if (!tokenHeader) {
      throw createError({ statusCode: 401, statusMessage: "Authorization header is missing" });
    }
    if (!tokenHeader.startsWith(TOKEN_PREFIX)) {
      throw createError({
        statusCode: 401,
        statusMessage: `Authorization header must start with ${TOKEN_PREFIX}`,
      });
    }

    const token = tokenHeader.substring(TOKEN_PREFIX.length);
    const googlePublicKeys = await fetchGooglePublicKeys();
    const decodedToken = await verifyAndDecodeJwt(token, googlePublicKeys, config.projectId);
    const _transformCurrentUser = config?.transformCurrentUser || transformCurrentUser;
    const user = _transformCurrentUser(decodedToken);
    event.context[config.userContextKey ?? USER_CONTEXT_KEY] = user;
  });
};

export type { DecodedIdToken };
