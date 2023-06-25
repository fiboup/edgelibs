import { IdentityErrorResponse } from "./google-identify.types";

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
