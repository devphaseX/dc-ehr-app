import Link from 'next/link';
import { AuthNav } from './auth-nav';

let authed = true;
const MainNavbar = () => {
  if (!authed) {
    return (
      <div className="px-10 py-6 w-full">
        <div className="max-w-[1360px] mx-auto">
          <div className="w-full flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-x-2">
              <Link
                href="/sign-in"
                className="flex items-center justify-center px-6 py-[14px]
                 rounded-[48px] bg-primary-50 text-primary-500
                  font-semibold text-sm font-josefin w-fit h-fit"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center justify-center px-6 py-[14px] 
                rounded-[48px] bg-primary-500 text-white
                 font-semibold text-sm font-josefin w-fit h-fit"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AuthNav />;
};

export default MainNavbar;
