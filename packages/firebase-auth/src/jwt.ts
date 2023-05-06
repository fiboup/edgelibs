import { decodeProtectedHeader, importX509, jwtVerify } from "jose";
import { JwtDecodeError } from "./error";

export const verifyAndDecodeJwt = async (
  jwtToken: string,
  publicKeys: Record<string, string>,
  projectId: string
) => {
  try {
    const { kid } = await decodeProtectedHeader(jwtToken);
    if (!kid) {
      throw new TypeError("invalid jwt header does not contain kid");
    }
    if (!publicKeys[kid]) {
      throw new TypeError(
        "invalid kid or google public key has been updated recently"
      );
    }
    const x509 = publicKeys[kid];
    const publicKey = await importX509(x509, "RS256");
    const { payload } = await jwtVerify(jwtToken, publicKey, {
      audience: projectId,
      issuer: `https://securetoken.google.com/${projectId}`,
    });

    return payload;
  } catch (e: unknown) {
    if (e instanceof TypeError) {
      throw new JwtDecodeError(e.message);
    } else {
      console.error(e);
      throw new JwtDecodeError("uncaught jwt decode exception");
    }
  }
};
