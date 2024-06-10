import { Container } from '@/components/container';
import { TempLogo } from '@/components/temp-logo';
import Link from 'next/link';
import React from 'react';

type Props = {
  copyRightYear: number;
};

export const Footer = (props: Props) => {
  return (
    <section className="bg-neutral-900 py-8">
      <Container>
        <div className="w-full flex items-center justify-between">
          <div className="text-white">
            <TempLogo />
          </div>

          <nav>
            <ul>
              <li className="flex items-center gap-x-6">
                <Link
                  href="/resources"
                  className="text-white text-base font-josefin"
                >
                  Resources
                </Link>
                <Link
                  href="/libary"
                  className="text-white text-base font-josefin"
                >
                  Library
                </Link>
                <Link
                  href="/terms-and-policy"
                  className="text-white text-base font-josefin"
                >
                  Terms and Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
};
