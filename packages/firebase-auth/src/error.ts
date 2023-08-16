export class JwtDecodeError extends Error {}

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

export class IdentityError extends Error {
  readonly errorResponse: IdentityErrorResponse;
  constructor(errorResponse: IdentityErrorResponse) {
    super();
    this.errorResponse = errorResponse;
  }

  getResponse(): Response {
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          message: this.errorResponse.error.message,
        },
      }),
      {
        status: this.errorResponse.error.code,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
