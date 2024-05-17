import { Container } from '@/components/container';
import { ResourceCard, ResourceData } from '@/components/resource-card';
import { defaultResources } from '@/lib/constants/resource';
import { AccessSteps } from './setup';

const [primaryResource, secondaryResource] = defaultResources;

export const Resources = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="py-[116px]">
          <AccessSteps />
        </div>
        <div className="bg-primary-500 rounded-[16px] p-16 space-y-12">
          <h4 className="text-white text-5xl font-bold">Browse resources</h4>
          <div className="flex items-center gap-x-12">
            <div className="flex-1">
              <ResourceCard item={primaryResource} />
            </div>
            <div className="flex-1">
              <ResourceCard item={secondaryResource} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
