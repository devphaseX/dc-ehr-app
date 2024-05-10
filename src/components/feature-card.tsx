import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';

export type FeatureItem = {
  highlight?: boolean;
  title: string;
  description: string;
  icon: string;
};

type FeatureCardProps = {
  item: FeatureItem;
};

export const FeatureCard = ({
  item: { title, description, icon },
}: FeatureCardProps) => {
  return (
    <Card
      className="flex group rounded-[12px] border
     border-none space-y-8 flex-col items-center shadow-none text-center p-12"
    >
      <CardHeader className="p-0 w-fit">
        <div className="inline-flex justify-center items-center h-16 w-16 rounded-full border border-primary-100">
          <div className="w-8 h-8 relative">
            <Image src={icon} alt="icon" fill className="object-contain" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        <h6 className="font-bold font-satoshi text-2xl text-primary-900">
          {title}
        </h6>
        <p className="text-base text-neutral-500">{description}</p>
      </CardContent>
    </Card>
  );
};
