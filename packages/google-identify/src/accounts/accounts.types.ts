type FederatedUserIdentifier = {
	providerId: string;
	rawId: string;
};

export type LookUpPayload = {
	idToken: string;
	localId?: string[];
	email?: string[];
	delegatedProjectNumber?: string;
	phoneNumber?: string[];
	federatedUserId?: FederatedUserIdentifier[];
	tenantId?: string;
	targetProjectId?: string;
	initialEmail?: string[];
};

type ProviderUserInfo = {
	providerId: string;
	displayName: string;
	photoUrl: string;
	federatedId: string;
	email: string;
	rawId: string;
	screenName: string;
	phoneNumber: string;
};

type MfaEnrollment = {
	mfaEnrollmentId: string;
	displayName: string;
	enrolledAt: string;

	// Union field mfa_value can be only one of the following:
	phoneInfo: string;
	totpInfo: {
		emailAddress: string;
	};
	emailInfo: {
		emailAddress: string;
	};
	// End of list of possible types for union field mfa_value.

	// Union field unobfuscated_mfa_value can be only one of the following:
	unobfuscatedPhoneInfo: string;
	// End of list of possible types for union field unobfuscated_mfa_value.
};

type MfaFactor = {
	displayName: string;

	// Union field mfa_value can be only one of the following:
	phoneInfo: string;
	// End of list of possible types for union field mfa_value.
};

export type GoogleIdentifyUserInfo = {
	localId: string;
	email: string;
	displayName: string;
	language: string;
	photoUrl: string;
	timeZone: string;
	dateOfBirth: string;
	passwordHash: string;
	salt: string;
	version: number;
	emailVerified: boolean;
	passwordUpdatedAt: number;
	providerUserInfo: ProviderUserInfo[];
	validSince: string;
	disabled: boolean;
	lastLoginAt: string;
	createdAt: string;
	screenName: string;
	customAuth: boolean;
	rawPassword: string;
	phoneNumber: string;
	customAttributes: string;
	emailLinkSignin: boolean;
	tenantId: string;
	mfaInfo: MfaEnrollment[];
	initialEmail: string;
	lastRefreshAt: string;
};

export type GetAccountInfoResponse = {
	users: GoogleIdentifyUserInfo[];
};

enum NotificationCode {
	NOTIFICATION_CODE_UNSPECIFIED = "NOTIFICATION_CODE_UNSPECIFIED", //	No notification specified.
	MISSING_LOWERCASE_CHARACTER = "MISSING_LOWERCASE_CHARACTER", //	Password missing lowercase character.
	MISSING_UPPERCASE_CHARACTER = "MISSING_UPPERCASE_CHARACTER", //	Password missing uppercase character.
	MISSING_NUMERIC_CHARACTER = "MISSING_NUMERIC_CHARACTER", //	Password missing numeric character.
	MISSING_NON_ALPHANUMERIC_CHARACTER = "MISSING_NON_ALPHANUMERIC_CHARACTER", //	Password missing non alphanumeric character.
	MINIMUM_PASSWORD_LENGTH = "MINIMUM_PASSWORD_LENGTH", //	Password less than minimum required length.
	MAXIMUM_PASSWORD_LENGTH = "MAXIMUM_PASSWORD_LENGTH", //	Password greater than maximum required length.
}

type UserNotification = {
	notificationCode: NotificationCode;
	notificationMessage: string;
};

enum ClientType {
	CLIENT_TYPE_UNSPECIFIED = "CLIENT_TYPE_UNSPECIFIED", //	Client type is not specified.
	CLIENT_TYPE_WEB = "CLIENT_TYPE_WEB", // Client type is web.
	CLIENT_TYPE_ANDROID = "CLIENT_TYPE_ANDROID", //	Client type is android.
	CLIENT_TYPE_IOS = "CLIENT_TYPE_IOS", //Client type is ios.
}

enum RecaptchaVersion {
	RECAPTCHA_VERSION_UNSPECIFIED = "RECAPTCHA_VERSION_UNSPECIFIED", //The reCAPTCHA version is not specified.
	RECAPTCHA_ENTERPRISE = "RECAPTCHA_ENTERPRISE", //The reCAPTCHA enterprise.
}

export type SignInWithPasswordPayload = {
	email: string;
	password: string;
	captchaResponse?: string;
	returnSecureToken?: boolean;
	tenantId?: string;
	clientType?: ClientType;
	recaptchaVersion?: RecaptchaVersion;
};

export type VerifyPasswordResponse = {
	kind: string;
	localId: string;
	email: string;
	displayName: string;
	idToken: string;
	registered: boolean;
	profilePicture: string;
	oauthAccessToken: string;
	oauthExpireIn: number;
	oauthAuthorizationCode: string;
	refreshToken: string;
	expiresIn: string;
	mfaPendingCredential: string;
	mfaInfo: MfaEnrollment[];
	userNotifications: UserNotification[];
};

export type SignUpPayload = {
	email: string;
	password: string;
	displayName: string;
	captchaChallenge: string;
	captchaResponse: string;
	instanceId: string;
	idToken: string;
	emailVerified: boolean;
	photoUrl: string;
	disabled: boolean;
	localId: string;
	phoneNumber: string;
	tenantId: string;
	targetProjectId: string;
	mfaInfo: MfaFactor[];
	clientType: ClientType;
	recaptchaVersion: RecaptchaVersion;
};

export type SignUpResponse = {
	kind: string;
	idToken: string;
	displayName: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
};
