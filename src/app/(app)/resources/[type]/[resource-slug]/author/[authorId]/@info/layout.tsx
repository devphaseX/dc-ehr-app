'use client';

import { useSearchParams } from 'next/navigation';

type InfoLayoutProps = {
  contribute: React.ReactNode;
  profile: React.ReactNode;
  publish: React.ReactNode;
};

const InfoLayout = ({ contribute, profile, publish }: InfoLayoutProps) => {
  const { tab = 'publish' } = Object.fromEntries(useSearchParams()) as {
    tab?: 'profile' | 'contribute' | 'publish';
  };

  return (
    <div>
      {tab === 'publish' && publish}
      {tab === 'contribute' && contribute}
      {tab === 'profile' && profile}
    </div>
  );
};

export default InfoLayout;
