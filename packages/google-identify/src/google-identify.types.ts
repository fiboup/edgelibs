export type GoogleIdentifyErrorResponse = {
  error: {
    code: number;
    message: string;
    errors?: GoogleIdentifyError[];
    status: GoogleIdentifyErrorStatusCode;
    details: GoogleIdentifyDetailError[];
  };
};

type GoogleIdentifyError = {
  message: string;
  reason: string;
  domain: string;
};

export type GoogleIdentifyErrorStatusCode =
  | "INVALID_ARGUMENT"
  | "INVALID_CUSTOM_TOKEN"
  | "CREDENTIAL_MISMATCH"
  | "TOKEN_EXPIRED"
  | "USER_DISABLED"
  | "USER_NOT_FOUND"
  | "INVALID_REFRESH_TOKEN"
  | "INVALID_GRANT_TYPE"
  | "MISSING_REFRESH_TOKEN"
  | "EMAIL_EXISTS"
  | "OPERATION_NOT_ALLOWED"
  | "TOO_MANY_ATTEMPTS_TRY_LATER"
  | "EMAIL_NOT_FOUND"
  | "INVALID_PASSWORD"
  | "USER_DISABLED"
  | "INVALID_ID_TOKEN"
  // rome-ignore lint/nursery/noBannedTypes: Ignore type checking to make this can be flexible string type
  | (string & {});

type GoogleIdentifyDetailError = {
  "@type": string;
  reason: string;
  domain: string;
  metadata: Record<string, string>;
};

/**
 * See in https://github.com/firebase/firebase-js-sdk/blob/master/packages/app/src/public-types.ts#L84
 */
export interface FirebaseConfigs {
  /**
   * An encrypted string used when calling certain APIs that don't need to
   * access private user data
   * (example value: `AIzaSyDOCAbC123dEf456GhI789jKl012-MnO`).
   */
  apiKey?: string;
  /**
   * Auth domain for the project ID.
   */
  authDomain?: string;
  /**
   * Default Realtime Database URL.
   */
  databaseURL?: string;
  /**
   * The unique identifier for the project across all of Firebase and
   * Google Cloud.
   */
  projectId?: string;
  /**
   * The default Cloud Storage bucket name.
   */
  storageBucket?: string;
  /**
   * Unique numerical value used to identify each sender that can send
   * Firebase Cloud Messaging messages to client apps.
   */
  messagingSenderId?: string;
  /**
   * Unique identifier for the app.
   */
  appId?: string;
  /**
   * An ID automatically created when you enable Analytics in your
   * Firebase project and register a web app. In versions 7.20.0
   * and higher, this parameter is optional.
   */
  measurementId?: string;
}
