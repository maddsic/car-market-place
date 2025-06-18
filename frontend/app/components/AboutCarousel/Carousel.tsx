import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { CardContent, CardDescription } from "~/components/ui/card";
import image from "/carousel.jpg?url";
import image1 from "/carousel1.jpg?url";
import image2 from "/carousel2.jpg?url";
import image3 from "/carousel3.jpg?url";
import image4 from "/carousel4.jpg?url";
import { useState } from "react";

const carouselItems = [image, image1, image2, image3, image4];

const AboutCarousel = () => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <CardDescription>
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <img src={item} alt="" className="w-full" />
                  </CardContent>
                </CardDescription>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="items flex justify-center gap-x-3">
        {carouselItems.map((_, i) => (
          <div
            key={i}
            className={`${i === index ? "bg-yellow" : "bg-gray-400"} h-2 w-2 cursor-pointer rounded-full`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </>
  );
};

export default AboutCarousel;
