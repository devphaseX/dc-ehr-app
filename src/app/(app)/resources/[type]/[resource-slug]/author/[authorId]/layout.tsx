import { Container } from '@/components/container';
import { getAuthor } from '@/lib/fake/courses';
import { AuthorCard } from './_components/author-card';
import { InfoTab } from './_components/info-tab';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot } from 'lucide-react';

type AuthorLayoutProps = { info: React.ReactNode };

const AuthorLayout = ({ info }: AuthorLayoutProps) => {
  const author = getAuthor();
  return (
    <div className="w-full pt-6 space-y-12">
      <Container outerClassName="px-[48px]" className="max-w-[100%] w-full">
        <div className="flex items-center w-full flex-col mb-16">
          <div
            className="w-full bg-[#D9D9D9] rounded-[16px] h-[280px] relative mb-[82px] bg-cover bg-center"
            style={{ backgroundImage: `url(${author.bgCoverImg})` }}
          >
            <div className="absolute border-[4px] border-white rounded-full left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
              <Avatar className="size-[116px]">
                <AvatarImage src={author.avatarImg ?? undefined} alt="avatar" />
                <AvatarFallback>
                  {author.fullName.replace(
                    /(?:(\w)\w*?)\s+(?:(\w)\w*)/,
                    '$1$2'
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-[2px] text-center">
              <h4 className="font-medium text-black text-lg">
                {author.fullName}
              </h4>
              <p className="text-base text-neutral-800 font-medium">
                {author.email}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-neutral-400 flex items-center gap-x-2">
                <span className="font-bold text-neutral-800">
                  {author.bookPublishedCounts}
                </span>
                Published
              </p>
              <Dot className="size-4 text-[#D9D9D9]" />
              <p className="text-sm text-neutral-400 flex items-center gap-x-2">
                <span className="font-bold text-neutral-800">
                  {author.contributeCounts}
                </span>
                contributions
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-[1fr,min-content] gap-x-12 w-full ">
          <div className="flex-1 w-full space-y-6">
            <InfoTab
              urlSync="tab"
              tabs={[
                {
                  label: `Publications (${author.bookPublishedCounts})`,
                  tag: 'publish',
                },
                { label: `Contributions`, tag: 'contribute' },
                { label: 'Profile', tag: 'profile' },
              ]}
            />

            {info}
          </div>
          <div className="min-w-[380px]">
            <AuthorCard author={author} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthorLayout;
