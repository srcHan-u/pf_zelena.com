"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@components/icons/InstagramIcon";
import { FacebookIcon } from "@components/icons/FacebookIcon";
import { Heading } from "@components/atoms/Heading";
import { Hotspot, HotspotBubble } from "@components/molecules/HotspotBubble";

const hotspots: Hotspot[] = [
  {
    id: "h1",
    x: 8,
    y: 61,
    title: "What inspires me",
    content: (
      <div className="space-y-2">
        <p>
          I’m deeply inspired when clients ask for tattoos based on their
          favorite movies, books, or games. As a fan of fantasy, anime, and
          storytelling myself, I feel an instant connection when someone wants
          to bring a scene or symbol from something they love to life.
        </p>
        <p>
          I’m equally touched by tattoos that carry personal meaning, memories
          connected to family, friends, or important life moments. It’s always
          special to help turn those emotions into something visual and lasting.
        </p>
        <p>
          And of course, I love working with color! Through color, I can express
          emotion more vividly and give even small tattoos a sense of life.
        </p>
      </div>
    ),
    classNamePanel: "translate-x-0 md:translate-x-[-50%]",
  },

  {
    id: "h2",
    x: 77,
    y: 50,
    title: "Beyond tattooing",
    content: (
      <div className="space-y-2">
        <p>
          Outside of tattooing, which takes up most of my time I absolutely love
          reading.  I read a bit of everything, but I have a special love for
          prose. Fantasy holds a place close to my heart, but I also enjoy
          historical fiction, philosophy from different cultures, and books
          about technology, global economies, and science. I’m especially drawn
          to contemporary philosophy and books that feel essential to read in
          adulthood.
        </p>
        <p>
          Beyond books, I’m a big fan of anime, films, and video games. I try to
          stay updated on the gaming world even if I don’t have time to play
          everything, I enjoy watching streamers and following new releases.
          That world brings me joy and constant inspiration.
        </p>
        <p>
          Another passion of mine is working with my hands. I love making and
          fixing things, whether it&apos;s building LEGO, soldering a broken
          charger, or repairing something at home. My apartment is always full
          of creative clutter, a total contrast to the minimalist calm of my
          workspace. Home is where I let ideas flow freely.
        </p>
      </div>
    ),
    classNamePanel: "translate-x-[-80%]",
  },
];

export function AboutSection() {
  return (
    <section id="about">
      <div className="container py-[40px] md:py-[20px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-15 md:gap-8">
          <div className="w-full md:w-1/2 lg:max-w-[445px] space-y-6">
            <Heading text="About Me" />
            <div className="space-y-4 text-base font-neue-mon text-neutral-800 dark:text-neutral-200">
              <p>
                I&apos;ve been tattooing since 2016, but drawing has been a part
                of my life for as long as I can remember. My passion is small
                color tattoos inspired by anime, fantasy, and the kind of
                stories that live inside people.
              </p>
              <p>
                For me, tattooing is more than art. It&apos;s a personal and
                meaningful connection between two people, a quiet collaboration
                that turns an idea into something lasting for a very long time,
                or even forever.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] lg:h-[600px]">
            <div className="rounded-[20px] overflow-hidden relative w-full h-full">
              <Image
                src="/images/about-image.png"
                alt="Anna portrait"
                className="object-cover"
                fill
                loading="lazy"
              />
            </div>

            {hotspots.map((h) => (
              <HotspotBubble key={h.id} data={h} />
            ))}
            <div className="absolute bottom-[30px] left-[50%] -translate-x-2/4 flex space-x-4 mt-2">
              <Link
                href="https://instagram.com/yourprofile"
                aria-label="Instagram"
                target="_blank"
                rel="noopener"
                className="hover:scale-110 transition-transform duration-200"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://facebook.com/yourprofile"
                aria-label="Facebook"
                target="_blank"
                rel="noopener"
                className="hover:scale-110 transition-transform duration-200"
              >
                <FacebookIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
