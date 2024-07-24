import { AuthError } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

export const GENERIC_ERROR = "Uh oh! An unexpected error occurred.";

export class ActionError extends Error {
  constructor(message = GENERIC_ERROR) {
    super(message);
  }
}

export const action = createSafeActionClient({
  handleReturnedServerError: (err) => {
    return err instanceof ActionError ? err.message : GENERIC_ERROR;
  },
});

// export const protectedAction = createSafeActionClient({
//   handleReturnedServerError: (e) => {
//     return e instanceof ActionError ? e.message : GENERIC_ERROR;
//   },
//   handleServerErrorLog: (e) => {
//     console.log(e.message);
//   },
//   middleware: async () => {
//     const session = await auth();
//     if (!session?.user) {
//       throw new AuthError('Not authenicated');
//     }

//     return session.user;
//   },
// });
