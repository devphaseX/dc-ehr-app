import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { useState } from "react";
import Image from "next/image";
type ImageGalleryProps = {
  images: Array<string>;
};

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex gap-x-[25px]">
      <div className="size-[486px] relative">
        <div className="absolute inset-0 rounded-[12px]">
          <Carousel>
            {images.map((image) => (
              <CarouselItem>
                <Image src={image} alt="" />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col gap-y-6">{}</div>
    </div>
  );
};
