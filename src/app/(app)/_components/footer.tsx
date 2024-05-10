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
            <div className="w-full flex justify-between items-center">
              <div className="space-y-10 max-w-[586px] w-full">
                <h5 className="font-bold text-white text-[56px] leading-[64px]">
                  Register now using your email address
                </h5>
                <p className="text-neutral-200 text-xl">
                  Lorem ipsum dolor sit amet consectetur. Pretium amet tellus
                  sed feugiat pharetra. Habitant ornare a tempor dolor in enim
                  pharetra ut pharetra ipsum dolor
                </p>
              </div>
              <div className="max-w-[482px] w-full">
                <div className="space-y-[24px]">
                  <div className="space-y-3">
                    <Label className="font-bold text-white text-base">
                      Email address
                    </Label>
                    <Input
                      className="w-full h-[56px] bg-neutral-50 border-none rounded-[8px] 
                        px-6 py-4 placeholder:text-neutral-300 text-base"
                      placeholder="felixwestley@gmail.com"
                    />
                  </div>

                  <Button
                    className="w-full font-bold text-base  py-4 text-white h-fit bg-neutral-900 rounded-[8px]"
                    variant="link"
                  >
                    Register now
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
      <div className="bg-neutral-900 py-10">
        <Container>
          <div className="flex items-start justify-between">
            <div className="max-w-[584px] space-y-4 text-neutral-500">
              <h6 className="text-lg text-neutral-50">
                💕 Made with love by DC EHR
              </h6>
              <p className="text-base text-neutral-500">
                Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
                feugiat pharetra. Habitant ornare a tempor dolor in enim
                pharetra ut pharetra ipsum dolor
              </p>
            </div>

            <div className="text-neutral-500 text-lg">
              Copyright {copyRightYear}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
