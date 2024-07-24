"use client";

import { ImageGallery } from "@/components/image-gallery";
import { useNewResourceStore } from "../form-state";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PreviewResourcePage() {
  const { post } = useNewResourceStore();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!post) {
      router.push("/create/new");
    }
  }, [post]);

  if (!post) return null;

  return (
    <div className="bg-neutral-50 min-h-full pt-14 pb-[445px]">
      <Container>
        <div>
          <Link
            href="/security-questions"
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </Link>
          <div className="bg-white rounded-[12px] p-[48px]">
            <div className="max-w-[789px] w-full mx-auto space-y-[48px]">
              <ImageGallery images={post.images} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
