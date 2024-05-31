import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Slash } from 'lucide-react';

import { Container } from '@/components/container';
import { defaultResources } from '@/lib/constants/resource';
import { redirect } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import { ResourceFilters } from '../_component/resource-filter';
import { Search } from './search';

export default function ResourceHead({ params }: { params: { type: string } }) {
  const resource = defaultResources.find(
    ({ title }) => title.toLowerCase() === params.type.toLowerCase()
  );
  if (!resource) return redirect('/resources');

  const breadcrumbRoutes: Array<{ label: string; href: string }> = [
    { label: 'Resources', href: '/resources' },
    { label: resource.title, href: resource.resourceUrl },
  ];

  return (
    <section className="bg-white w-full pt-12">
      <Container className="max-w-[1200px]">
        <div className="space-y-12">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbRoutes.map((route, i) => (
                <React.Fragment key={route.href}>
                  {i !== 0 && (
                    <BreadcrumbSeparator className="[&>svg]:size-4 text-neutral-300"></BreadcrumbSeparator>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={route.href}
                      className={cn(
                        'uppercase font-medium text-sm text-neutral-300',
                        route.href === resource.resourceUrl &&
                          'text-primary-500 font-bold'
                      )}
                    >
                      {route.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="w-full bg-primary-500 rounded-[16px]  lg:min-h-[280px] py-12 px-[71px] space-y-8">
            <div className="space-y-8">
              <div className="space-y-8">
                <h3 className="text-white font-bold text-5xl">
                  {resource.title}
                </h3>
                <p className="text-lg text-white/60">
                  {resource.topicSampleTitle}
                </p>
              </div>
            </div>

            <Search />
          </div>
          <ResourceFilters />
        </div>
      </Container>
    </section>
  );
}
