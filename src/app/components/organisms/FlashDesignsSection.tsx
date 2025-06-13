"use client";

import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heading } from "@components/atoms/Heading";
import { ButtonUI } from "@components/atoms/Button";
import { useModal } from "@/app/context/ModalContext";
import { ImageUI } from "@components/atoms/ImageUI";

async function urlToFile(
  url: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}

export type FlashDesignT = {
  name?: string;
  image?: { url: string }[];
  preferredSizeCmMin?: number;
  preferredSizeInchMin?: number;
  price?: number;
  preferredSizeInchMax?: number;
  preferredSizeCmMax?: number;
  repetitionsNumber?: number;
  isDeposit?: boolean;
  preferredPlacement?: string[];
  deposit?: number;
  lastModified?: string;
};

type Props = {
  items: FlashDesignT[];
};

export function FlashDesignsSection({ items }: Props) {
  const { open } = useModal();
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      dragSpeed: 1,
      mode: "snap",
      initial: 0,
      slides: {
        perView: 1,
        spacing: 10,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: {
            perView: 2,
            spacing: 24,
          },
        },
        "(min-width: 1440px)": {
          slides: {
            perView: 3,
            spacing: 27,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section
      id="flash-designs"
      className="pt-[88px] pb-[60px] sm:pt-[100px] sm:pb-[80px] md:pt-[148px] md:pb-[112px]"
    >
      <Heading text="Flash Designs" className="mb-12" />

      <div className="relative container">
        <div ref={sliderRef} className="keen-slider">
          {items.map((item, idx) => {
            const transformPlacement =
              item.preferredPlacement?.map((placement) => {
                return placement.replace(" ", "_").toLowerCase();
              }) || [];

            return (
              <div className="keen-slider__slide p-4" key={idx}>
                <div className="bg-white rounded-2xl flex flex-col items-center h-[429px] shadow-xl p-5">
                  <h3 className="self-start font-sans font-bold text-lg uppercase mb-4">
                    {item.name}
                  </h3>
                  <div className="relative w-full mb-6 h-[350px]">
                    <ImageUI
                      src={item?.image?.[0].url || "/images/placeholder.png"}
                      alt={item?.name || `Flash design ${idx + 1}`}
                      lastModified={item?.lastModified}
                      fill
                      classNames={{
                        image: "object-contain",
                      }}
                      priority
                    />
                  </div>
                  <ButtonUI
                    text="Book this flash"
                    type="contained"
                    color="black"
                    className="md:!py-[10px]"
                    onClick={async () => {
                      const singleFile = await urlToFile(
                        item?.image?.[0]?.url || "/images/placeholder.png",
                        `flash-design-${idx + 1}.png`,
                        "image/png"
                      );

                      const dt = new DataTransfer();
                      dt.items.add(singleFile);

                      open({
                        placement: transformPlacement,
                        inspiration: dt.files,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-12 lg:gap-18 mt-8">
          <button
            onClick={() => slider?.current?.prev()}
            className="
            relative xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:left-2
            sm:left-4
            p-2 bg-[#C2C2C2] rounded-full shadow hover:bg-gray-100
            focus:outline-none
          "
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} color="white" />
          </button>
          <button
            onClick={() => slider?.current?.next()}
            className="
            relative xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:right-2
            sm:right-4
            p-2 bg-[#C2C2C2] rounded-full shadow hover:bg-gray-100
            focus:outline-none
          "
            aria-label="Next slide"
          >
            <ChevronRight size={24} color="white" />
          </button>
        </div>
      </div>
    </section>
  );
}
