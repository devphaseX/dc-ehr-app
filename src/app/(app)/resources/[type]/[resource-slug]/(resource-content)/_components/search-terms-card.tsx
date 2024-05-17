import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SearchTermsCardProps = {
  terms: string[];
};

export const SearchTermsCard = ({ terms }: SearchTermsCardProps) => {
  return (
    <Card className="border-neutral-100 rounded-[16px] w-full p-8 space-y-4 shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="font-medium text-lg text-black">Search</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full flex flex-wrap items-center gap-3">
          {Array.from(new Set(terms), (term) => (
            <div
              className="inline-flex items-center justify-center
             py-2 px-3 bg-neutral-50 text-neutral-600 font-bold rounded-[32px]"
            >
              {term}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
