import { MiddlewareHandler } from "hono";
import {
  fetchGooglePublicKeys,
  verifyAndDecodeJwt,
} from "@fiboup/firebase-auth";

const tokenPrefix = "Bearer ";

export type FirebaseAuthConfig = {
  projectId: string;
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

    const currentUser = await verifyAndDecodeJwt(
      token,
      googlePublicKeys,
      config.projectId
    );
    c.set("currentUser", currentUser);
    await next();
  };
};
