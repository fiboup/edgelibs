import { JwtDecodeError } from "./error";
import { decodeProtectedHeader, importX509, jwtVerify } from "jose";

/**
 * Information about the sign in event, including which sign in provider was
 * used and provider-specific identity details.
 *
 * This data is provided by the Firebase Authentication service and is a
 * reserved claim in the ID token.
 */
export interface DecodedFirebase extends Record<string, any> {
  /**
   * Provider-specific identity details corresponding
   * to the provider used to sign in the user.
   */
  identities: Record<string, any>;

  /**
   * The ID of the provider used to sign in the user.
   * One of `"anonymous"`, `"password"`, `"facebook.com"`, `"github.com"`,
   * `"google.com"`, `"twitter.com"`, `"apple.com"`, `"microsoft.com"`,
   * `"yahoo.com"`, `"phone"`, `"playgames.google.com"`, `"gc.apple.com"`,
   * or `"custom"`.
   *
   * Additional Identity Platform provider IDs include `"linkedin.com"`,
   * OIDC and SAML identity providers prefixed with `"saml."` and `"oidc."`
   * respectively.
   */
  sign_in_provider: string;

  /**
   * The type identifier or `factorId` of the second factor, provided the
   * ID token was obtained from a multi-factor authenticated user.
   * For phone, this is `"phone"`.
   */
  sign_in_second_factor?: string;

  /**
   * The `uid` of the second factor used to sign in, provided the
   * ID token was obtained from a multi-factor authenticated user.
   */
  second_factor_identifier?: string;

  /**
   * The ID of the tenant the user belongs to, if available.
   */
  tenant?: string;
}
export interface DecodedIdToken {
  /**
   * The audience for which this token is intended.
   *
   * This value is a string equal to your Firebase project ID, the unique
   * identifier for your Firebase project, which can be found in [your project's
   * settings](https://console.firebase.google.com/project/_/settings/general/android:com.random.android).
   */
  aud: string;

  /**
   * Time, in seconds since the Unix epoch, when the end-user authentication
   * occurred.
   *
   * This value is not set when this particular ID token was created, but when the
   * user initially logged in to this session. In a single session, the Firebase
   * SDKs will refresh a user's ID tokens every hour. Each ID token will have a
   * different [`iat`](#iat) value, but the same `auth_time` value.
   */
  auth_time: number;

  /**
   * The email of the user to whom the ID token belongs, if available.
   */
  email?: string;

  /**
   * Whether or not the email of the user to whom the ID token belongs is
   * verified, provided the user has an email.
   */
  email_verified?: boolean;

  /**
   * The ID token's expiration time, in seconds since the Unix epoch. That is, the
   * time at which this ID token expires and should no longer be considered valid.
   *
   * The Firebase SDKs transparently refresh ID tokens every hour, issuing a new
   * ID token with up to a one hour expiration.
   */
  exp: number;

  firebase: DecodedFirebase;

  /**
   * The ID token's issued-at time, in seconds since the Unix epoch. That is, the
   * time at which this ID token was issued and should start to be considered
   * valid.
   *
   * The Firebase SDKs transparently refresh ID tokens every hour, issuing a new
   * ID token with a new issued-at time. If you want to get the time at which the
   * user session corresponding to the ID token initially occurred, see the
   * [`auth_time`](#auth_time) property.
   */
  iat: number;

  /**
   * The issuer identifier for the issuer of the response.
   *
   * This value is a URL with the format
   * `https://securetoken.google.com/<PROJECT_ID>`, where `<PROJECT_ID>` is the
   * same project ID specified in the [`aud`](#aud) property.
   */
  iss: string;

  /**
   * The phone number of the user to whom the ID token belongs, if available.
   */
  phone_number?: string;

  /**
   * The photo URL for the user to whom the ID token belongs, if available.
   */
  picture?: string;

  /**
   * The `uid` corresponding to the user who the ID token belonged to.
   *
   * As a convenience, this value is copied over to the [`uid`](#uid) property.
   */
  sub: string;

  /**
   * The `uid` corresponding to the user who the ID token belonged to.
   *
   * This value is not actually in the JWT token claims itself. It is added as a
   * convenience, and is set as the value of the [`sub`](#sub) property.
   */
  uid: string;

  /**
   * Other arbitrary claims included in the ID token.
   */
  [key: string]: any;
}

export const verifyAndDecodeJwt = async (
  jwtToken: string,
  publicKeys: Record<string, string>,
  projectId: string,
): Promise<DecodedIdToken> => {
  try {
    const { kid } = await decodeProtectedHeader(jwtToken);
    if (!kid) {
      throw new TypeError("invalid jwt header does not contain kid");
    }
    if (!publicKeys[kid]) {
      throw new TypeError("invalid kid or google public key has been updated recently");
    }
    const x509 = publicKeys[kid];
    const publicKey = await importX509(x509, "RS256");
    const { payload } = await jwtVerify(jwtToken, publicKey, {
      audience: projectId,
      issuer: `https://securetoken.google.com/${projectId}`,
    });

    return payload as DecodedIdToken;
  } catch (e: unknown) {
    if (e instanceof TypeError) {
      throw new JwtDecodeError(e.message);
    } else {
      console.error(e);
      throw new JwtDecodeError("uncaught jwt decode exception");
    }
  }
};
