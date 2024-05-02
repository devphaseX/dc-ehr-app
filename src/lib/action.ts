import { auth } from '@/auth';
import { AuthError } from 'next-auth';
import { createSafeActionClient } from 'next-safe-action';

export const serverAction = createSafeActionClient({
  handleServerErrorLog: (e) => {
    console.log(e.message);
  },
  middleware: async () => {
    const session = await auth();
    if (session?.user) {
      throw new AuthError('Not authenicated');
    }
  },
});
