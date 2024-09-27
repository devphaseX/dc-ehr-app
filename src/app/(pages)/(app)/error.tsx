"use client";
import { Container } from "@/components/container";
import { Button } from "@/components/rich-text/components";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="bg-neutral-50 flex-1 py-[68px] pb-[145px] px-[120px] flex flex-col">
      <Container className="bg-white rounded-[12px] py-[145px] px-[310px]  flex-1  flex flex-col items-center justify-center">
        <div className="w-[580px] flex flex-col items-center gap-y-12">
          <Image
            src={"/imgs/error_page_icon.png"}
            alt=""
            width={161}
            height={235}
          />
          <div className="space-y-9">
            <div className="space-y-3 text-center">
              <h3 className="font-bold text-[28px] leading-[37px] text-neutral-800">
                Oops! Something went wrong
              </h3>
              <p className="text-lg text-neutral-400">
                We're sorry, but it seems we've encountered an unexpected issue.
                Our team has been notified and we're working to resolve it as
                quickly as possible. Please try again later or contact our
                support team if the problem persists.
              </p>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  location.reload();
                }}
                className="flex items-center justify-center px-8 py-4 w-full
        rounded-[48px] bg-primary-500 text-white font-semibold text-base font-josefin full h-fit"
              >
                Refresh page
              </Button>
              <Link
                href={"/"}
                className="flex items-center justify-center px-8 py-4 w-full
        rounded-[48px] bg-neutral-50 text-primary-500  font-semibold text-base font-josefin full h-fit"
              >
                Go back to home
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
