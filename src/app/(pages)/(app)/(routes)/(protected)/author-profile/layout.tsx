import { Container } from "@/components/container";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  info: React.ReactNode;
  children: React.ReactNode;
  searchParams: { userId: string; prevUrl?: string };
};

const Layout = ({ info, children, searchParams }: Props) => {
  const { userId, prevUrl } = searchParams;

  if (!userId) {
    return redirect("/");
  }

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
          {info}
          <div className="flex-1 relative">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
