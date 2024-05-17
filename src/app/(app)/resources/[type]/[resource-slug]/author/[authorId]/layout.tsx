import { Container } from '@/components/container';
import { getAuthor } from '@/lib/fake/courses';
import { AuthorCard } from './_components/author-card';
import { InfoTab } from './_components/info-tab';

type AuthorLayoutProps = { info: React.ReactNode };

const AuthorLayout = ({ info }: AuthorLayoutProps) => {
  const author = getAuthor();
  return (
    <div className="w-full pt-6 space-y-12">
      <Container outerClassName="px-[48px]" className="max-w-[100%] w-full">
        <div className="w-full bg-[#D9D9D9] rounded-[16px] h-[280px]"></div>
      </Container>
      <Container>
        <div className="grid grid-cols-[min-content,1fr] gap-x-12 w-full ">
          <div className="min-w-[380px]">
            <AuthorCard author={author} />
          </div>
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
        </div>
      </Container>
    </div>
  );
};

export default AuthorLayout;
