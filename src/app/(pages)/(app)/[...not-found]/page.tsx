import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="bg-neutral-50 flex-1 py-[68px] pb-[145px] px-[120px] flex flex-col">
      <Container className="bg-white rounded-[12px] py-[145px] px-[310px]  flex-1  flex flex-col items-center justify-center">
        <div className="w-[580px] flex flex-col items-center gap-y-12">
          <Image
            src={"/imgs/page_not_found_bg.png"}
            alt=""
            width={161}
            height={235}
          />
          <div className="space-y-9">
            <div className="space-y-3 text-center">
              <h3 className="font-bold text-[28px] leading-[37px] text-neutral-800">
                Page not found
              </h3>
              <p className="text-lg text-neutral-400">
                Oops! The page you're looking for doesn't exist. It might have
                been moved or deleted.
              </p>
            </div>
            <Link
              href={"/"}
              className="flex items-center justify-center px-8 py-4 w-full
        rounded-[48px] bg-primary-500 text-white font-semibold text-base font-josefin full h-fit"
            >
              Go back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
