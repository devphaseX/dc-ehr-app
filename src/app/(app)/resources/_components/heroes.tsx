import { Container } from '@/components/container';
import { ResourceCard } from '@/components/resource-card';
import { defaultResources } from '@/lib/constants/resource';

const [primaryResource, secondaryResource] = defaultResources;
export const Heroes = () => {
  return (
    <section className="bg-neutral-100 py-16">
      <Container>
        <div className="mb-8">
          <h3 className="font-bold text-neutral-800 text-2xl">
            Type of resources
          </h3>
        </div>
        <div className="w-full flex items-center gap-x-12">
          <div className="flex-1">
            <ResourceCard item={primaryResource} />
          </div>
          <div className="flex-1">
            <ResourceCard item={secondaryResource} />
          </div>
        </div>
      </Container>
    </section>
  );
};
