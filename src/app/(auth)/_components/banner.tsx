import Image from 'next/image';

export const Banner = ({ bannerImgUrl }: { bannerImgUrl: string }) => {
  return (
    <div className="h-full w-full rounded-[16px] overflow-hidden bg-primary-500 relative">
      <Image
        src={bannerImgUrl}
        alt="banner"
        fill
        className="object-cover object-center"
      />
    </div>
  );
};
