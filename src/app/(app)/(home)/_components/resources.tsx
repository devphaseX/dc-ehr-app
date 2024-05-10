import { Container } from '@/components/container';
import { ResourceCard, ResourceData } from '@/components/resource-card';
import { defaultResources } from '@/lib/constants/resource';

const [primaryResource, secondaryResource] = defaultResources;

export const Resources = () => {
  return (
    <section className="w-full bg-neutral-50 py-16">
      <Container>
        <div className="flex items-center gap-x-12">
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
