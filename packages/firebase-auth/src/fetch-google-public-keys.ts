// Grab the public key from https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com
// and use a JWT library to verify the signature. Use the value of max-age in the Cache-Control header of the response
// from that endpoint to know when to refresh the public keys.
export const fetchGooglePublicKeys = async (): Promise<
  Record<string, string>
> => {
  const response = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  );
  const json = await response.json();
  return json as Promise<Record<string, string>>;
};
