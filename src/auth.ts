import { SignInSchema } from '@/lib/validations/sign-in';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cache } from 'react';

const {
  signIn,
  signOut,
  auth: uncached_auth,
  handlers,
  // unstable_update: updateSession,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (cred) => {
        const { email, password } = SignInSchema.parse(cred);

        return {};
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/sign-in', signOut: '/sign-out', error: '/', newUser: '/' },
});

export const auth = cache(uncached_auth);
export { signIn, signOut, handlers };
