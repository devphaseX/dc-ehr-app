import { Container } from '@/components/container';
import { FeatureCard, FeatureItem } from '@/components/feature-card';
import { Button } from '@/components/ui/button';

const features: FeatureItem[] = [
  {
    title: 'Create your account',
    description:
      'Join our vibrant community of educators in seconds. Sign up and gain access to a wealth of resources.',
    highlight: true,
    icon: '/icons/profile.svg',
  },
  {
    title: 'Upload your resources',
    description:
      'Upload any type of educational resource, from lesson plans and activities to assessments and presentations.',
    icon: '/icons/share.svg',
  },
  {
    title: 'Version control access',
    description:
      'Our version control system tracks changes, allowing you to revert to previous versions or collaborate seamlessly with colleagues.',
    icon: '/icons/git.svg',
  },
  {
    title: 'Download Valuable Content',
    description:
      'Our version control system tracks changes, allowing you to revert to previous versions or collaborate seamlessly with colleagues.',
    icon: '/icons/share.svg',
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-white py-[124px]">
      <Container>
        <div className="w-full">
          <div className="space-y-6 text-center mb-[80px]">
            <h3 className="text-[56px] text-neutral-900 leading-[64px] font-bold">
              Learn how it work
            </h3>
            <p className="text-neutral-400 text-xl">
              Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
              feugiat pharetra.
            </p>
          </div>

          <div className="relative z-60 mb-[128px]">
            <div className="absolute inset-0">
              <div className="absolute inset-y-0 left-[50%] -translate-x-[50%]">
                <div className="flex h-full flex-col gap-y-24">
                  <div className="w-[1px] flex-1 bg-neutral-200"></div>
                  <div className="w-[1px] flex-1 bg-neutral-200"></div>
                </div>
              </div>
              <div className="absolute flex gap-x-24 top-[50%] z-10 w-full">
                <div className="h-[1px] flex-1 bg-neutral-200"></div>
                <div className="h-[1px] flex-1 bg-neutral-200"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 bg-transparent">
              {features.map((feature, index) => (
                <FeatureCard key={index} item={feature} />
              ))}
            </div>
          </div>

          <div className="flex justify-center ">
            <Button
              className="bg-primary-500 w-fit px-8 py-4
                  rounded-[10px] h-fit text-white font-bold text-base hover:text-primary-50/80 leading-[100%]"
            >
              Register
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
