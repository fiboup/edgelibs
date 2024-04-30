# @fiboup/hono-firebase-auth

## 1.0.5

### Patch Changes

- use Hono req header function to get request header

## 1.0.4

### Patch Changes

- [hono-firebase-auth] fix JWTDecodeError export

## 1.0.3

### Patch Changes

- [hono-firebase-auth] export JWTDecodeError type

## 1.0.2

### Patch Changes

- [hono-firebase-auth] add readme for hono-firebase-auth package

## 1.0.1

### Patch Changes

- [firebase-auth]

  - export DecodedIdToken type

  [hono-firebase-auth]

  - allow developer to custom the current user object payload
  - use an empty string for the current user context key to disable setting Hono current user context variable

- Updated dependencies
  - @fiboup/firebase-auth@1.0.3
