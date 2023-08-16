# Firebase Authentication/Identity Platform integration for h3

This package allows easily integrate Firebase Authentication/Identity Platform to your [h3](https://github.com/unjs/h3) API project.

## Features

- h3 middleware to decode and verify JWT token issued by Firebase Authentication service
- h3 context variable `user` for you to access any where in your application
  
  ```ts
  const user = event.context.user // DecodedIdToken;
  ```

- Allowed to custom `user` shape with `transformCurrentUser`


## Install

With NPM

```bash
npm install @fiboup/h3-firebase-auth
```

With Yarn

```bash
yarn add @fiboup/h3-firebase-auth
```

With pnpm

```bash
pnpm add @fiboup/h3-firebase-auth
```

## Usage

### Add authentication middleware to your h3 app

```ts
import { createApp } from "h3";
import { validateFirebaseAuth } from "@fiboup/h3-firebase-auth";

const app = new createApp();

app.use(
  "/",
  eventHandler({
    onRequest: [
      (event) =>
        validateFirebaseAuth({
          // Note: Go to your Firebase project, then visit Project settings for the project id***
          projectId: "TEST",
          // If you ignore this field, default is `user`
          userContextKey: "currentUser",
          transformCurrentUser(user) {
            return {
              ...user,
              nickname: user.email?.split("@")[0],
            };
          },
        })(event),
    ],
    async handler(event) {
      const user = event.context.currentUser;
      return `Hello ${user.email}`;
    },
  }),
)
```

To make your custom current user context type-safe, don't forget to write your custom h3 in H3EventContext
on global typing of project, like `global.d.ts`


```ts
declare module "h3" {
  interface H3EventContext extends Record<string, any> {
    params?: Record<string, string>;
     /**
     * Matched router Node
     *
     * @experimental The object structure may change in non-major version.
     */
    matchedRoute?: RouteNode;
    sessions?: Record<string, Session>;
    clientAddress?: string;
    user?: DecodedIdToken;
  }
}
```

## License

MIT &copy; [Fiboup](https://github.com/fiboup)
