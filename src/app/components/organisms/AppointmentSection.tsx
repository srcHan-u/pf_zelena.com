"use client";
import { Heading } from "@components/atoms/Heading";
import { ArrowIcon } from "@components/icons/ArrowIcon";
import { AppointmentCard } from "@components/molecules/AppointmentCard";
import { ButtonUI } from "@components/atoms/Button";
import { useModal } from "@/app/context/ModalContext";
import { Disclosure } from "@headlessui/react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Consultation",
    description: (
      <>
        Fill out the booking form. Describe your tattoo idea, preferred
        placement, size, style, and the dates that work best for you. Please
        attach 1–3 references. It can be tattoos, sketches, or anything you
        like. This really helps me feel your idea.
        <br />
        <br />
        Once we confirm the details, I’ll share available dates and send over
        the rest of the info (address, deposit instructions, etc).
      </>
    ),
  },
  {
    id: 2,
    title: "Deposit",
    description: (
      <>
        To confirm your appointment, a $100 deposit is required. You can send it
        via e-transfer, and the deposit go towards in the final price.
        <br />
        <br />
        If you need to cancel or reschedule, just let me know at least 72 hours
        in advance, and we’ll figure it out individually.
        <br />
        <br />
        Otherwise, the deposit is non-refundable.
      </>
    ),
  },
  {
    id: 3,
    title: "Drawing Design",
    description: (
      <>
        Design preparation is free. Usually, I create a few designs 1 day before
        the session. I’ll send them as Photoshop mockups, so you can see how the
        tattoo might look on your body in real life.
        <br />
        <br />
        Don’t worry, we’ll go over everything together and adjust it until it
        feels just yours.
      </>
    ),
  },
  {
    id: 4,
    title: "Day of Session",
    description: (
      <>
        Bring a good mood, a favorite snack, lunch, hwater, or a book, whatever
        helps you feel comfortable during the session :)
      </>
    ),
  },
];

export function AppointmentSection() {
  const { open } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="appointment"
      className="relative bg-[#ECECEC] py-[19px] px-[15px]"
    >
      <div className="bg-white rounded-[100px] overflow-hidden">
        <div className="container pt-[90px] pb-[70px]">
          <Heading text="How to get an appointment" />

          <div
            className="mt-12
          grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
          items-start justify-items-center
          gap-10 xl:gap-[38px] "
          >
            {isMounted &&
              steps.map((step, idx) => (
                <Disclosure
                  key={step.id}
                  defaultOpen={isMobile ? step.id === 1 : true}
                >
                  {({ open: isOpen }) => (
                    <div className="flex flex-col text-left md:text-center w-[245px] relative">
                      <AppointmentCard
                        stepN={step.id}
                        title={step.title}
                        description={step.description}
                        isOpen={isOpen}
                      />

                      {idx < steps.length - 1 && (
                        <ArrowIcon className="hidden xl:block md:absolute text-gray-300 top-1 right-[-30%]" />
                      )}
                    </div>
                  )}
                </Disclosure>
              ))}
          </div>

          <div className="mt-12 sm:mt-18 md:mt-22 xl:mt-26 flex justify-center">
            <ButtonUI
              text="Get a consultations"
              type="contained"
              color="black"
              onClick={open}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
