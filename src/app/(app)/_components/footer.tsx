'use client';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePathname } from 'next/navigation';

export const Footer = ({ copyRightYear }: { copyRightYear: number }) => {
  const pathname = usePathname();
  return (
    <>
      {(pathname === '/' || !pathname) && (
        <section className="bg-primary-500 py-24">
          <Container>
            <div className="w-full flex flex-col items-center text-center max-w-[893px] mx-auto">
              <div className="w-full mb-6">
                <h5 className="font-bold text-white text-[56px] leading-[64px]">
                  Become a creator today
                </h5>
              </div>
              <p className="text-neutral-200 text-xl max-w-[893px] w-full">
                Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
                feugiat pharetra. Habitant ornare a tempor dolor in enim
                pharetra ut pharetra ipsum dolor
              </p>

              <Button
                className="px-8 py-4 rounded-[56px] text-primary-500 
            font-bold text-base w-fit h-fit bg-white mt-12"
              >
                Show all resources
              </Button>
            </div>
          </Container>
        </section>
      )}
      <div className="bg-neutral-900 py-10">
        <Container>
          <div className="flex items-start justify-between">
            <div className="max-w-[584px] text-neutral-500">
              <h6 className="text-lg text-neutral-400 font-medium uppercase">
                💕 Made with love by <span className="text-white">DC EHR</span>
              </h6>
            </div>

            <div className="text-neutral-500 text-lg uppercase">
              Copyright {copyRightYear}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
