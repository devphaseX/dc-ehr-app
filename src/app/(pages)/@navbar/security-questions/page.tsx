import Link from "next/link";

const SignUpNavbar = () => {
  return (
    <div className="w-full px-10 py-4 border-b border-neutral-200">
      <div className="max-w-[1360px] w-full mx-auto">
        <div className="flex items-center w-full justify-between">
          <div></div>
          <div className="flex items-center gap-x-2">
            <Link href="/sign-up" className="text-sm text-neutral-400">
              Have an account?
            </Link>
            <Link
              href="/sign-in"
              className="flex item-center justify-center py-2.5 px-5 rounded-[40px] bg-neutral-50
              font-josefin font-semibold text-primary-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpNavbar;
