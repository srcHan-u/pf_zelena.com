"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@components/icons/InstagramIcon";
import { FacebookIcon } from "@components/icons/FacebookIcon";
import { Heading } from "@components/atoms/Heading";
import { Map } from "lucide-react";
import { ButtonUI } from "@components/atoms/Button";
import { useModal } from "@/app/context/ModalContext";

export type ContactItem = {
  currentLocation: string;
  email: string;
  instagramLink: string;
  facebookLink: string;
};

type Props = {
  item: ContactItem;
};
export function ContactsSection({ item }: Props) {
  const { open } = useModal();
  return (
    <section id="contacts" className="pt-6 pb-24 md:py-6">
      <div className="container">
        <div className="space-y-15 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/contacts-image-1.jpg"
              alt="Studio interior"
              width={640}
              height={400}
              className="w-full h-auto rounded-3xl object-cover"
              priority
            />
          </div>

          <div className="w-full md:max-w-[380px] text-black dark:text-white space-y-9">
            <Heading text="Contacts" className="text-center" />

            <div className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 translate-y-2" />
              <span className="font-work">
                Current location: <strong>{item?.currentLocation}</strong>
                <Link
                  href="https://g.co/kgs/aMBxthv"
                  target="_blank"
                  rel="noopener"
                  className="ml-2 underline hover:text-[#1e40af] hover:scale-101 flex items-center space-x-1 transition duration-300"
                >
                  <Map size={24} className="inline-block" color="blue" />
                  <span className="ml-1">View on map</span>
                </Link>
              </span>
            </div>

            <ul className="space-y-1 font-work text-base">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:zelenatattoo@gmail.com"
                  className="inline-block underline hover:text-[#1e40af] hover:scale-101 transition duration-300"
                >
                  {item?.email}
                </a>
              </li>
            </ul>

            <div className="flex space-x-[10px] mt-4">
              <Link
                href={item?.instagramLink || "#"}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <InstagramIcon
                  size={34}
                  className="hover:transform hover:scale-110 transition duration-300"
                />
              </Link>
              <Link
                href={item?.facebookLink || "#"}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <FacebookIcon
                  size={34}
                  className="hover:transform hover:scale-110 transition duration-300"
                />
              </Link>
            </div>

            <div className="mt-6 flex justify-center md:justify-start">
              <ButtonUI
                text="Get a consultation"
                type="contained"
                color="black"
                onClick={open}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
