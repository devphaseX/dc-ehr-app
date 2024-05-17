'use client';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Heroes = () => {
  const router = useRouter();
  return (
    <section className="w-full">
      <Container>
        <div className="flex gap-x-[144px] items-start">
          <div className="flex-1">
            <div className="w-full">
              <div className="flex items-center gap-x-2 font-medium text-lg uppercase text-neutral-400 mb-4">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/icons/star.svg"
                    alt="icon"
                    fill
                    className="object-contain"
                  />
                </div>
                100% certified creators
              </div>
              <h1 className="text-primary-900 text-7xl font-bold leading-[88px] max-w-[512px]">
                Best largest UK resources library
              </h1>
              <p className="max-w-[584px] text-neutral-600 font-medium text-xl mt-6">
                Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
                feugiat pharetra. Habitant ornare a tempor dolor in enimut
                pharetra ipsum dolor sit ame iat pharetra. Habitant orna
              </p>
              <div className="mt-12">
                <Button
                  className="bg-primary-500 w-fit px-8 py-4
                  rounded-[8px] h-fit text-white font-bold text-base hover:text-primary-50/80 leading-[100%]"
                  onClick={() => router.push('/sign-up')}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[472px]">
            <div className="w-full grid grid-cols-2 grid-rows-2 h-[472px] gap-x-12 gap-y-16">
              <div className="rounded-[16px] rounded-tl-[50%] rounded-bl-[50%] relative bg-primary-500 overflow-hidden">
                <Image
                  src="/imgs/hero-1.png"
                  alt="hero"
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div className="rounded-[16px] relative bg-sky-100 overflow-hidden">
                <Image
                  src="/imgs/hero-2.png"
                  alt="hero"
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div className="rounded-[16px] relative bg-yellow-300 overflow-hidden">
                <Image
                  src="/imgs/hero-4.png"
                  alt="hero"
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div className="rounded-[16px] rounded-tr-[50%] rounded-br-[50%] relative bg-sky-400 overflow-hidden">
                <Image
                  src="/imgs/hero-3.png"
                  alt="hero"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
