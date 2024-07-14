import { ProfileActionTab } from './tab-meta';

const BookPublications = () => {
  return (
    <div className="max-w-[855px] w-full bg-white rounded-[24px] absolute inset-0">
      <div className="p-8 h-full">
        <div className="space-y-8">
          <h3 className="font-semibold text-[40px] leading-[54px] text-neutral-800">
            Profile
          </h3>
          <ProfileActionTab />
        </div>
      </div>
    </div>
  );
};

export default BookPublications;
