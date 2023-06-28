import { GoogleIdentifyErrorResponse } from "./google-identify.types";

export class GoogleIdentityError extends Error {
  readonly response: GoogleIdentifyErrorResponse;
  constructor(response: GoogleIdentifyErrorResponse) {
    super();
    this.response = response;
  }

  getResponse(): Response {
    const { code, message, status } = this.response.error;
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          message,
          status: code,
          statusCode: status,
        },
      }),
      {
        status: code,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
