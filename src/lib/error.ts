export class NonCompliantResponseError extends Error {
  message = "response don't comply to the expected schema";
}

export class FetchError extends Error {}
