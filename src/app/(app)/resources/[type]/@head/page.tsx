import { Container } from '@/components/container';
import { defaultResources } from '@/lib/constants/resource';
import { redirect } from 'next/navigation';

export default function ResourceHead({ params }: { params: { type: string } }) {
  const resource = defaultResources.find(
    ({ title }) => title.toLowerCase() === params.type.toLowerCase()
  );
  if (!resource) return redirect('/resources');

  return (
    <section className="bg-neutral-50 w-full">
      <Container>
        <div className="w-full"></div>
      </Container>
    </section>
  );
}