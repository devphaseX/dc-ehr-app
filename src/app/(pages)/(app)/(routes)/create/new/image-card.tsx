import React from 'react';
import { Loader2 } from 'lucide-react';

type Props = {
  previewUrl?: string;
  loading: boolean;
  url?: string;
};

export const ImageCard = ({ previewUrl, loading }: Props) => {
  return (
    <div className="size-16 bg-neutral-100 rounded-[8px] relative">
      {loading && (
        <div className="absolute inset-0 z-[10]">
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="bg-neutral-200  text-primary-500 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};
