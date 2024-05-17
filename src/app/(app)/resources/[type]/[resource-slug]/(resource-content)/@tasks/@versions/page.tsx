import { versionChanges } from '@/lib/fake/version';
import { VersionCard } from '../_components/version-card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const VersionPage = async () => {
  const fileName = 'Robot guide V1.pdf';
  /* 
 
  */
  return (
    <div className="space-y-[26px]">
      <h5 className="text-xs font-bold uppercase">Version history</h5>
      <div className="space-y-8">
        <div className="w-full flex  gap-x-4">
          <div className="p-4 rounded-[4px] bg-neutral-50  flex gap-x-4 items-center flex-1">
            <div className="inline-flex items-center font-medium text-neutral-500 gap-x-2">
              <Image src="/icons/pdf.svg" alt="icon" width={16} height={16} />
              {fileName}
            </div>
            <div className="inline-flex text-[10px] px-3 py-1 rounded-[28px] bg-[#4EAC86]/10 text-[#4EAC86]">
              current version
            </div>
          </div>
          <div className="self-stretch">
            <Button className="font-bold text-sm text-white px-5 py-2.5 w-fit h-full rounded-[4px]">
              Download
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          {versionChanges.map((change) => (
            <VersionCard {...change} />
          ))}
        </div>
        <Button
          variant="ghost"
          className="font-bold text-[#1774FF]  text-sm p-0 w-fit h-fit !bg-none"
        >
          View more history
        </Button>
      </div>
    </div>
  );
};

export default VersionPage;
