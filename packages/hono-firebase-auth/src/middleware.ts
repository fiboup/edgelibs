import { MiddlewareHandler } from "hono";
import {
  fetchGooglePublicKeys,
  verifyAndDecodeJwt,
} from "@fiboup/firebase-auth";
import type { DecodedIdToken } from "@fiboup/firebase-auth";

const tokenPrefix = "Bearer ";
const defaultCurrentUserContextKey = "currentUser";

export type FirebaseAuthConfig = {
  projectId: string;
  transformCurrentUser?: <T>(decodedToken: DecodedIdToken) => T;
  // set to empty string ("") to disable setting the current user context variable
  currentUserContextKey?: string;
};

export type DefaultFirebaseAuthInjectedVariables = {
  currentUser?: DecodedIdToken;
};

export const defaultTransformCurrentUser = (decodedToken: DecodedIdToken) => {
  return decodedToken;
};

export const validateFirebaseAuth = (
  config: FirebaseAuthConfig
): MiddlewareHandler => {
  return async (c, next) => {
    const tokenHeader = c.req.headers.get("Authorization") || "";
    if (!tokenHeader.startsWith(tokenPrefix)) {
      return await next();
    }
    const token = tokenHeader.substring(tokenPrefix.length);
    const googlePublicKeys = await fetchGooglePublicKeys();

    const decodedToken = await verifyAndDecodeJwt(
      token,
      googlePublicKeys,
      config.projectId
    );

    const transformCurrentUser =
      config.transformCurrentUser || defaultTransformCurrentUser;
    const currentUser = transformCurrentUser(decodedToken);

    if (config.currentUserContextKey !== "") {
      c.set(
        config.currentUserContextKey ?? defaultCurrentUserContextKey,
        currentUser
      );
    }

    await next();
  };
};
