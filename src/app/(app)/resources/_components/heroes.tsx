import { Container } from '@/components/container';
import { ResourceCard } from '@/components/resource-card';
import { defaultResources } from '@/lib/constants/resource';

const [primaryResource, secondaryResource] = defaultResources;
export const Heroes = () => {
  return (
    <section className="bg-white pt-[30px] pb-20">
      <Container>
        <div className="bg-primary-500 rounded-[16px] p-16">
          <div className="mb-12">
            <h3 className="font-bold text-white text-5xl">Browse resources</h3>
          </div>
          <div className="w-full flex items-center gap-x-12">
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
