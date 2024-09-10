import { Container } from "@/components/container";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ResourceLayout({
  children,
  info,
}: {
  children: React.ReactNode;
  info: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 pt-14 pb-[111px] min-h-full">
      <Container>
        <div>
          <Link
            href="/security-questions"
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </Link>
        </div>

        <div className="flex gap-x-6">
          <div className="flex-1 relative">{children}</div>
          {info}
        </div>
      </Container>
    </div>
  );
}
