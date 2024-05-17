'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
import { ContributorCard } from '../_components/contributor-card';
import { Separator } from '@/components/ui/separator';

const da = [
  {
    id: '7a9b8c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: '/imgs/avatar-1.png',
    role: 'owner',
  },
  {
    id: 'w9x8y7z6-5a4b-3c2d-1e0f-ghijklmnopqr',
    fullName: 'Michael Brown',
    email: 'michael.brown@example.com',
    avatarUrl: '/imgs/avatar-2.png',
    role: 'contributor',
  },
  {
    id: 'j2k1l0m9-n8o7-p6q5-r4s3-t2u1v0wxyz01',
    fullName: 'David Wilson',
    email: 'david.wilson@example.com',
    avatarUrl: '/imgs/avatar-3.png',
    role: 'contributor',
  },
  {
    id: 'uv45wx67-yz89-ab01-cd23-ef45gh67ij89',
    fullName: 'Robert Anderson',
    email: 'robert.anderson@example.com',
    avatarUrl: '/imgs/avatar-4.png',
    role: 'contributor',
  },
] as const;

const ContributorsTab = () => {
  const [search, setSearch] = useState('');
  const owners = da.filter((a) => a.role === 'owner');
  const contributors = da.filter((b) => b.role !== 'owner');

  return (
    <div className="w-full space-y-8">
      <div className="w-full relative flex h-[56px]">
        <Image
          src="/icons/search-normal.svg"
          alt="icon"
          width={24}
          height={24}
          className="absolute left-12  top-1/2 -translate-x-[100%] -translate-y-1/2 "
        />
        <Input
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="Search resources"
          className="pl-16 pr-4 py-4 h-full w-full shadow-none 
            placeholder:text-neutral-400  placeholder:text-base 
            !ring-offset-0 !ring-transparent rounded-none rounded-tl-[56px] rounded-bl-[56px] text-neutral-700 "
        />
        <Button
          className="w-[100px] shadow-none h-auto self-stretch
             bg-primary-500 font-bold text-white flex items-center
           justify-center rounded-none rounded-tr-[56px] rounded-br-[56px] !ring-offset-0 !ring-transparent !outline-none
            capitalize text-base px-6 py-4"
        >
          Search
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-[18px]">
          <h6 className="uppercase font-bold text-neutral-400 text-xs">
            Owners
          </h6>
          <div>
            {owners.map((owner) => (
              <ContributorCard data={owner} />
            ))}
          </div>
        </div>
        <Separator className="h-[2px] bg-neutral-100" />
        <div className="space-y-[18px]">
          <h6 className="uppercase font-bold text-neutral-400 text-xs">
            Contributors
          </h6>
          <div className="space-y-8">
            {contributors.map((a) => (
              <ContributorCard data={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorsTab;
