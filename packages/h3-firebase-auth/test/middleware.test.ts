import { DecodedIdToken, validateFirebaseAuth } from "../src";
import { App, createApp, eventHandler, toNodeListener } from "h3";
import supertest, { SuperTest, Test } from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

// From Supertest
interface HTTPError extends Error {
  status: number;
  text: string;
  method: string;
  path: string;
}

const fakeUser: DecodedIdToken = {
  aud: "TEST",
  auth_time: 123,
  email: "test@gmail.com",
  email_verified: true,
  exp: 123,
  firebase: {
    identities: {},
    sign_in_provider: "google.com",
    sign_in_second_factor: "phone",
    second_factor_identifier: "123",
  },
  iat: 123,
  iss: "https://securetoken.google.com/TEST",
  phone_number: "123",
  picture: "https://lh3.googleusercontent.com/a-/123",
  sub: "123",
  uid: "123",
};

describe("Event middleware", () => {
  let app: App;
  let request: SuperTest<Test>;

  beforeEach(() => {
    app = createApp({ debug: false });
    request = supertest(toNodeListener(app));
  });

  it("Will return 400 when do not provide projectId", async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [(event) => validateFirebaseAuth({ projectId: "" })(event)],
        async handler(_event) {
          return "400 error";
        },
      }),
    );
    const result = await request.post("/test");
    const error = result.error as HTTPError;
    expect(error.status).toBe(400);
    expect(error.text).contain("Bad Request: Must provide projectId config");
  });

  it("Will return 401 when do not have Authorization header", async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [(event) => validateFirebaseAuth({ projectId: "TEST" })(event)],
        async handler(_event) {
          return "401 error";
        },
      }),
    );
    const result = await request.post("/test");
    const error = result.error as HTTPError;
    expect(error.status).toBe(401);
    expect(error.text).contain("Authorization header is missing");
  });

  it('Will return 401 when Authorization header does not start with "Bearer"', async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [(event) => validateFirebaseAuth({ projectId: "TEST" })(event)],
        async handler(_event) {
          return "401 error";
        },
      }),
    );
    const result = await request.get("/test").set("Authorization", "NOT BEARER");
    const error = result.error as HTTPError;
    expect(error.status).toBe(401);
    expect(error.text).contain("Authorization header must start with");
  });

  it('Will return 200 when Authorization header start with "Bearer"', async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [(event) => validateFirebaseAuth({ projectId: "TEST" })(event)],
        async handler(event) {
          const user = event.context.user as DecodedIdToken;
          expect(user).toStrictEqual(fakeUser);
          return "200";
        },
      }),
    );
    const result = await request.get("/test").set("Authorization", "Bearer token");
    expect(result.text).toBe("200");
  });

  // Success cases ----------------------------------------------
  vi.mock("@fiboup/firebase-auth", () => ({
    async fetchGooglePublicKeys() {
      return {
        "6380ef12f95f916cad7a4ce388d2c2c3c2302fde":
          "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAKxDPqAwFt++MA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIz\nMDgxMDA5Mzk0MVoXDTIzMDgyNjIxNTQ0MVowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQCXQner48m3UwZBVoyWe/4rhPKZ+UeUqj8MBg37ZW5EeNVS\nMPr7e/6KEoqJ70cy/sLPRhXrkqrFUaHzckOpQyd07G7X1GN4CJF/tQjzCr7y9P3q\n9DRBuvcnf0zJq5fOEuguTsrOpjOP+zWxL8BKjE5vOuuum6hMxwzxStc2Q9kjMMvz\n7VWug1SM6XTHmSQHssnqnRJ5cwI4SG5XO0YzRhA0CyPQuFU7EslGetkc1rpSGRX2\npMn3pD37fz+GPhTzLOKSlzWXDqPB4BHEhrXKVLv+qszmfb1YpldO8AYUtNXO3FDR\nt4vwWs2PgI6pHvY7vAxr5y50NdGgq2NIfe6iawdBAgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQBiRV/7bAnwG/mr/Zkd1cO5+2lbr6HQW6e8r5NqlkWS\nLb8EanpKz7FNV+Ez7Lyug8aGZymtMSvb5idIE0l5ZadX2tn35Lx8OOlwEujVXxZI\nCRrdeNjQX5/PNJrD+WUzzNL5ylAQgcwBZE1DV6VCUrlEdscxQUDWC3CpJs1zQGBk\nyVC7iYWnqlGjYjjTaNESTk8SguaQtRea2bafgkiw7wBfUBIXCynsCemLT4NBgwcX\nY5oh2tzWvfl+Y3Jv0af2tRPm+AAfAkUSzCSg2knOQ9Omv8+vqmrz4W5ipG3BVS8C\nH+B/xu8R4OECbSMlAjIuMI58+OtY3nqzuhNbSs8EEAqA\n-----END CERTIFICATE-----\n",
        cf3b5ada3ca391548d3592b3592923e36012b914:
          "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAN6IA4cSjd2+MA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIz\nMDgwMjA5Mzk0MFoXDTIzMDgxODIxNTQ0MFowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQC09EdXFC4DxPlpxqJWl/0jwnenb7Ghp+zUDnkoV6Z9bt3w\n+fJWhz4aw2yGRdxc/ZWr7W3/8XA5rDPhMognuEHE8Pfoysn4T4mRzhB99y2DiIC7\nmmvuF+ty7jq6o0ToAZ8vV2o6h3IYetNmtPO6vm8PFXBFnL8YgnhmFtPRGZeIuwty\ny+uaJsux/SjCf1OTQZRvRW+X0EiNspU4GpakCgUGLuIXfrrludzcCzUO65KtIbls\nbsNqri7XbFgRTv1drnoHIB7qOztL/FuwjK00QZfxGfBgYVi83J18kVRp+Si0EN0i\nf6rzm3tYKpJuGf+aWTCRcIgNRfRtrl7pwg4IX7yxAgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQCb+IU6a+AVza7UfloHGwAvfYRCoOF80kYrkEH24zUF\ndxGrCqIJFrxhN5MXv0GiZ1Ij/TZcfRCZo+noFJzB/1sB2JEaSIijaLoohVWUR699\nW4yND6dpIUWlevaYKbrZJlX7+zid+eLNzcBMF9yd+y/vJdnCe0+jGiFDljHnDt32\nx9Y3GvMmKvu/Om/deK3oHegktWHK3udb8PX4u9xtQA5+vuMWnIZ92HsinuglqMuX\ng8CoiXkjdRVkAukCPimp0iJkdaCCSk5Vd91uy8y1kDN81p0nxQj2E/7IA6Qz6yrU\nh8nuwArb0VS0DWcUVYaw2ZoSlVnHvFkAmZRV4MsqCoVg\n-----END CERTIFICATE-----\n",
      };
    },
    async verifyAndDecodeJwt(
      _token: string,
      _googlePublicKeys: Record<string, any>,
      _projectId: string,
    ) {
      return fakeUser;
    },
  }));

  it('Will return 200 when Authorization header start with "Bearer"', async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [(event) => validateFirebaseAuth({ projectId: "TEST" })(event)],
        async handler(event) {
          const user = event.context.user as DecodedIdToken;
          expect(user).toStrictEqual(fakeUser);
          return "200";
        },
      }),
    );
    const result = await request.get("/test").set("Authorization", "Bearer token");
    expect(result.text).toBe("200");
  });

  it("Change user context key to another key", async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [
          (event) =>
            validateFirebaseAuth({ projectId: "TEST", userContextKey: "currentUser" })(event),
        ],
        async handler(event) {
          const user = event.context.currentUser as DecodedIdToken;
          expect(user).toStrictEqual(fakeUser);
          return "200";
        },
      }),
    );
    const result = await request.get("/test").set("Authorization", "Bearer token");
    expect(result.text).toBe("200");
  });

  it("Transform user payload", async () => {
    app.use(
      "/",
      eventHandler({
        onRequest: [
          (event) =>
            validateFirebaseAuth({
              projectId: "TEST",
              transformCurrentUser(user) {
                return {
                  ...user,
                  nickname: user.email?.split("@")[0],
                };
              },
            })(event),
        ],
        async handler(event) {
          const user = event.context.user as DecodedIdToken;
          expect(user).toStrictEqual({ ...fakeUser, nickname: "test" });
          return "200";
        },
      }),
    );
    const result = await request.get("/test").set("Authorization", "Bearer token");
    expect(result.text).toBe("200");
  });
});
