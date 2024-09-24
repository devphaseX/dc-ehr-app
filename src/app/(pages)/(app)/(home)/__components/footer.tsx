import { Container } from "@/components/container";
import { TextBrandLogo } from "@/components/temp-logo";
import Link from "next/link";
import React from "react";

type Props = {
  copyRightYear: number;
};

export const Footer = (props: Props) => {
  return (
    <section className="bg-neutral-100 py-6">
      <Container>
        <div className="w-full flex items-center justify-between">
          <p className="font-medium text-neutral-700">Build with Love ❤️</p>
          <p>Copyright &copy;2024</p>
        </div>
      </Container>
    </section>
  );
};
