export type IdentityErrorResponse = {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
      reason: "invalid";
      domain: string;
    }[];
  };
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
