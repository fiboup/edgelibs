import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "H3 Firebase Auth",
      environment: "node",
      include: ["packages/h3-firebase-auth/**/*.test.ts"],
    },
  },
]);
