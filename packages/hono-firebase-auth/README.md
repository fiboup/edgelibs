# Firebase Authentication/Identity Platform integration for Hono

This package allows easily integrate Firebase Authentication/Identity Platform to your Hono API project.

## Features

- Hono middleware to decode and verify JWT token issued by Firebase Authentication service
- Hono context variable `currentUser` for you to access any where in your application
- Allowed to custom `currentUser` shape


## Install

With NPM

```bash
npm install @fiboup/hono-firebase-auth
```

With Yarn

```bash
yarn add @fiboup/hono-firebase-auth
```

With pnpm

```bash
pnpm add @fiboup/hono-firebase-auth
```

## Usage

### Add authentication middleware to your Hono app

```ts
import { Hono } from "hono";
import { validateFirebaseAuth } from "@fiboup/hono-firebase-auth";

const app = new Hono();
app.use(
  "*",
  validateFirebaseAuth({
    projectId: "<your_firebase_project_id>",
  })
);
```

***Note: Go to your Firebase project, then visit Project settings for the project id***

### Configure to catch Firebase JWT token decoding error for Hono

```ts
import { Hono } from "hono";
import { JwtDecodeError } from "@fiboup/hono-firebase-auth";

const app = new Hono();

app.onError((err, c) => {
  if (err instanceof JwtDecodeError) {
    return err.getResponse();
  }
  console.log(err);
  return new Response("Uncaught exception", {
    status: 500,
  });
});
```

### Get current user details which is decoded from Firebase JWT token

You can get the current user from Hono context with the key `currentUser`

```ts
import { Hono } from "hono";
import { validateFirebaseAuth } from "@fiboup/hono-firebase-auth";

const app = new Hono();
app.use(
  "*",
  validateFirebaseAuth({
    projectId: "<your_firebase_project_id>",
  })
);

app.get('/me', (c) => {
  const currentUser = c.get('currentUser')
  return c.json(currentUser)
})

```

To make it type-safe, you can use `DefaultFirebaseAuthInjectedVariables`

```ts
import type { DefaultFirebaseAuthInjectedVariables } from "@fiboup/hono-firebase-auth";

type Variables = DefaultFirebaseAuthInjectedVariables

const app = new Hono<{ Variables: Variables }>()
```

If you want to custom the context variable key, you can specify in the middleware config

```ts
import { Hono } from "hono";
import { validateFirebaseAuth } from "@fiboup/hono-firebase-auth";

const app = new Hono();
app.use(
  "*",
  validateFirebaseAuth({
    projectId: "<your_firebase_project_id>",
    currentUserContextKey: 'custom_current_user'
  })
);

```

Leave the `currentUserContextKey` a blank string to disable current user context

### Custom current user context info with `transformCurrentUser` callback

```ts
import { Hono } from "hono";
import { validateFirebaseAuth } from "@fiboup/hono-firebase-auth";
import type { DecodedIdToken } from "@fiboup/firebase-auth";

type MyCustomCurrentUser = {
    userId: string
}

const app = new Hono();
app.use(
  "*",
  validateFirebaseAuth({
    transformCurrentUser: <MyCustomCurrentUser>(decodedToken: DecodedIdToken) => {
        return {
            userId: decodedToken.sub,
        }
    }
  })
);

```

To make your custom current user context, don't forget to write your custom Hono variable


```ts
type Variables = {
    currentUser?: MyCustomCurrentUser
}

const app = new Hono<{ Variables: Variables }>()
```

## License

MIT &copy; [Fiboup](https://github.com/fiboup)
