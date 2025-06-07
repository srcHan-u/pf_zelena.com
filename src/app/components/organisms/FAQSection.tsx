"use client";

import React, { useState, Fragment } from "react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Plus, Minus, X } from "lucide-react";
import { Heading } from "../atoms/Heading";

type FAQ = { q: string; a: React.ReactNode };
type Category = { id: string; title: string; faqs: FAQ[] };

const categories: Category[] = [
  {
    id: "prep",
    title: "Reservation, Preparation & Session",
    faqs: [
      {
        q: "Is it possible to create an individual design?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Absolutely — most of the tattoos I create are fully custom and
              based on the customer’s idea.
            </p>
            <p>
              To make things easier, I always recommend filling out the form on
              my website. It helps structure your request and gives me
              everything I need to get started — like your idea, preferred
              placement and size, date, and a few references (tattoos, sketches,
              or anything that inspires you).
            </p>
            <p>
              From there, I’ll create a design in my own style and vision,
              always based on your original idea and preferences. Designs are
              usually ready one day before the session. I’ll send you Photoshop
              mockups showing how the tattoo might look on the selected body
              part and in the approximate size — it helps you better visualize
              the final result.
            </p>
            <p>
              And if you’d like to make changes — it’s totally fine and
              completely free :)
            </p>
          </div>
        ),
      },
      {
        q: "Is a deposit required? How to send it?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>Yes — a $100 deposit is required to confirm your booking.</p>
            <p>
              You can send it via e-transfer. Full instructions will be provided
              after we confirm the date.
            </p>
          </div>
        ),
      },
      {
        q: "How long does the session last?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              The duration depends on the idea and other details, but usually a
              session takes about 2–4 hours — including breaks, photo time, and
              a bit of chatting in between.
            </p>
            <p>
              I always recommend taking the day off if possible. It helps to
              focus on the tattoo without any time pressure. After the session,
              your body might feel a bit tired — so no work, no parties! Just go
              home, order pizza, watch a cozy movie.
            </p>
            <p>Your body (and mind) will thank you :)</p>
          </div>
        ),
      },
      {
        q: "What if I want to cancel or reschedule my appointment?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              If something important comes up, I kindly ask you to let me know
              at least 72 hours before your appointment. In that case, I’ll
              gladly refund the deposit or help reschedule — no hard feelings at
              all :)
            </p>
            <p>
              If the cancellation happens closer to the appointment, I totally
              understand that life can be unpredictable. But please note that in
              such cases, the deposit becomes non-refundable, as it serves as a
              small guarantee to secure your session and time.
            </p>
            <p>
              That said, I’ll still be happy to help you reschedule for another
              available day — the deposit will simply carry over.
            </p>
            <p>
              That said, I’ll gladly help you reschedule your appointment for
              another available day, but the original deposit will carry over
              and won’t be refunded.
            </p>
          </div>
        ),
      },
      {
        q: "How to prepare for the session?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-black">
                ✅ What to do before the session:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Get enough sleep and eat well — your body will thank you
                  later. If the session is long, feel free to bring some snacks
                  or order delivery to the studio :)
                </li>
                <li>
                  Wear comfortable clothes, and maybe bring a change — sometimes
                  ink can get messy.
                </li>
                <li>
                  You can also bring a book, headphones, or anything else to
                  keep yourself entertained.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xl text-black">
                🚫 What to avoid before the session:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Avoid intense workouts 1–2 days before the session. It helps
                  to keep your skin and muscles relaxed — that way, the
                  tattooing process goes smoother and gentler on your body.
                </li>
                <li>
                  No alcohol 24–48 hours before the session. It increases blood
                  flow and can affect how your skin reacts to the tattoo.
                </li>
                <li>
                  No need to shave the area — I’ll take care of that during the
                  session.
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        q: "How can I pay after the session?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              You can pay by e-transfer or cash — whatever’s easier for you.
            </p>
            <p>
              The deposit you paid earlier is always included in the final
              price, so you’ll just need to cover the remaining amount after the
              session.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "steril",
    title: "Healing, Touch-ups, Cover-ups & Sterilization",
    faqs: [
      {
        q: "What’s the proper tattoo aftercare?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-black">STAGE 1 - After the session</p>
              <div className="space-y-4">
                <p>
                  At the end of the session, I’ll cover your tattoo with second
                  skin — a protective film you’ll keep on for 4–5 days. During
                  this time, you don’t need to do anything: no cream, no
                  washing. You can shower and wear clothes as usual — the film
                  will protect everything.
                </p>
                <p>
                  Sometimes, you might notice a bit of ink or plasma collecting
                  under the film — that’s totally normal, especially with color
                  tattoos. If it’s just a small amount, don’t worry — it’ll dry
                  up on its own.
                </p>
                <p>
                  But if there’s quite a bit of liquid, you can gently lift one
                  corner of the film and dab it with a clean tissue to let the
                  fluid out. Alternatively, you can use something sterile, like
                  a clean needle, to make a tiny hole in the film where the
                  liquid has collected, and gently drain it onto a tissue.
                </p>
                <p>
                  ✨ And if you’re not sure what to do, just send me a photo.
                  I’ll take a look and guide you through it. Better to check
                  than to guess :)
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xl text-black">
                STAGE 2 - Remove the second skin
              </p>
              <div className="space-y-4">
                <p>
                  After 4–5 days, carefully remove the second skin and wash the
                  tattoo with light warm water and a mild, unscented liquid
                  soap.
                </p>
                <div>
                  <p>Then start the regular aftercare:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Apply a thin layer of healing cream (like Eucerin
                      Aquaphor, available at Shoppers or any pharmacy).
                    </li>
                    <li>Leave the cream on for about 3–4 hours.</li>
                    <li>
                      Wash the tattoo again with liquid soap and let it air dry
                      for about 10 minutes.
                    </li>
                    <li>Reapply the cream.</li>
                  </ol>
                </div>
                <p>
                  Repeat this routine 2–3 times a day until the skin finishes
                  peeling. It usually takes 7–10 days, and feels similar to when
                  your skin peels after sunburn — totally normal.
                </p>
                <p>
                  Need a visual guide? Watch this step-by-step video {"  "}
                  <a
                    href="https://drive.google.com/file/d/1hrK9jH-JgVTmIfYP2UNpkx24gTMnG_DF/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    here
                  </a>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xl text-black">STAGE 3 — After 7-10 days</p>
              <div className="space-y-4">
                <p>
                  Once your tattoo has peeled (usually after 7–10 days), the
                  skin may look healed — but deeper layers are still recovering.
                </p>
                <p>Full healing takes about 30–40 days.</p>
                <p>
                  During this time, it’s important to keep your skin
                  moisturized. You don’t need to follow a strict routine — just
                  apply a light, unscented moisturizer whenever the skin feels
                  dry or tight.
                </p>
                <p>
                  If you’re going out in the sun, don’t forget sunscreen! <br />
                  It protects the colors and helps your tattoo stay bright for
                  years.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xl text-black">
                STAGE 4 — Once it’s fully healed
              </p>
              <div className="space-y-4">
                <p>
                  Please don&apos;t forget to can send a photo through Instagram
                  or email
                </p>
                <p>I&apos;d be happy to see it!🖤</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        q: "How long does the healing process usually take?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Most tattoos go through the main healing phase in about 7–10 days
              — when the peeling stops and the skin calms down.
            </p>
            <p>
              But full skin recovery takes about 30–40 days, as the deeper
              layers continue to regenerate even after the tattoo looks healed
              on the outside.
            </p>
            <p>
              Everyone heals at their own pace, so don’t worry if it takes a bit
              longer :)
            </p>
          </div>
        ),
      },
      {
        q: "Is it normal if the tattoo looks a bit different after the tattoo is healed?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Yes, and it’s completely normal! <br />
              Tattoos are done by hand, not by a printer — so slight differences
              always happen. I also have my own style, technique, and
              “handwriting” that naturally show up in the final result.
            </p>
            <p>
              That doesn’t mean the tattoo will look totally different, but some
              small elements (around 5–10%) may come out a little different once
              it’s actually tattooed.
            </p>
          </div>
        ),
      },
      {
        q: "Do I need a touch-up? How often?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Most tattoos stay beautiful and bright for many years — especially
              with proper aftercare. <br />
              No touch-up is usually needed earlier than 4–5 years. But
              everyone’s skin is different, and sometimes a small part may fade
              or heal unevenly.
            </p>
            <p>
              If you notice anything unusual once it’s fully healed (after 3–4
              weeks), feel free to message me! <br />
              I’ll take a look and help you figure it out!
            </p>
          </div>
        ),
      },
      {
        q: "Is the touch-up included in the price?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Yes. <br />
              If your tattoo doesn’t heal perfectly — for example, if a small
              area fades, doesn’t settle properly, or something just feels off
              once it’s fully healed (usually after 3–4 weeks) — feel free to
              message me, and we can schedule a free touch-up once your skin has
              had at least 4–6 weeks to recover.
            </p>
            <p>
              If your tattoo healed well and you’re happy with it, but over time
              (especially after lots of sun exposure) it starts to fade a little
              — you’re always welcome to come in for a refresh. In that case,
              the touch-up would be charged at the minimum session price, since
              it’s a normal part of how tattoos naturally age, typically after
              6+ months or more.
            </p>
            <p>
              If I did your tattoo while guesting in another city or country,
              and you need a healing-related touch-up but I’m no longer in the
              area, no worries!
            </p>
            <p>
              We can wait until my next visit, and then we can fix everything
              for free.
            </p>
          </div>
        ),
      },
      {
        q: "What should I do if the tattoo peels, itches, or looks unusual?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Some peeling and light itching is totally normal, especially
              around days 3–7. That’s just your skin healing itself.
            </p>
            <p>
              Don’t scratch or peel the flakes — let your body do its thing.
              Keep the area clean, moisturized, and avoid tight clothing or
              rubbing.
            </p>
            <p>
              If something feels unusual or makes you unsure — just send me a
              photo. I’ll take a look and let you know if everything’s okay
            </p>
          </div>
        ),
      },
      {
        q: "Can I cover an old tattoo with a new one?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              It always depends on the case. <br />
              If your tattoo is very dark or fairly new, covering it can be
              quite difficult — especially in my style, which is light,
              colorful, and painterly. In those situations, full coverage may
              not be possible. If the tattoo is older (usually 3+ years) and
              small, there’s a chance we can work something out — especially if
              your idea fits my artistic approach.
            </p>
            <p>
              If you&apos;re open to laser fading, even just 2–3 sessions can
              make a huge difference. It lightens the old ink, allowing for a
              cleaner, brighter new tattoo — which is especially helpful if you
              want to keep it vibrant and colorful. Without fading, dark ink may
              still show through after healing, and touch-ups might be needed.
            </p>
            <p>
              Because of all this, I take on cover-up projects only rarely — and
              usually only when the old piece is small, light, and compatible
              with my style. Still, feel free to message me! I’m happy to take a
              look and offer honest advice.
            </p>
            <p>
              If it’s not something I can confidently take on, I’ll gladly
              recommend a laser clinic or another artist who specializes in
              cover-ups.
            </p>
          </div>
        ),
      },
      {
        q: "Can I get a tattoo over scars or after surgery or burns?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Yes — it’s absolutely possible to tattoo over scars or post-burn{" "}
              <br />
              skin. But there are a few important things to keep in mind.
            </p>
            <p>
              The scar must be fully healed, which usually means at least one
              year after the injury or surgery. A good rule of thumb: if the
              scar looks white and no longer feels sensitive or painful to the
              touch, it’s most likely ready.
            </p>
            <p>
              The size doesn’t matter — both small and large scars can be
              tattooed, as long as they’re healed. I have experience working on
              scar tissue, and while it’s definitely possible, it can be more
              challenging. The structure of the skin (epidermis and dermis) is
              often altered, which can affect how the pigment holds and how the
              area heals. Touch-ups are more common, and the process might feel
              a bit more uncomfortable than usual.
            </p>
            <p>
              That said, color tattoos work beautifully on scars. They shift the
              focus from the texture of the skin to the artwork itself. Many
              clients say that people no longer notice their scars at all, and
              they feel more confident seeing a meaningful or beautiful image
              instead of a reminder of trauma.
            </p>
            <p>
              Each case is unique, so the best thing to do is send me a clear
              photo of the area. I’ll take a look and let you know what’s
              possible — and how we can approach the design together
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "studio",
    title: "Studio Location, Gift Certificates & Payment",
    faqs: [
      {
        q: "What tools and materials do you use during the session?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              I work primarily with a Cheyenne Sol Nova machine — a reliable and
              precise tool that allows me to create detailed, clean, and
              consistent work. Depending on the session, I use either a
              sterilized reusable grip or a single-use disposable grip.
            </p>
            <p>
              For needles, I typically use single-use cartridges, most often by
              KWADRON, known for their quality and precision.
            </p>
            <p>
              When it comes to inks, I use only professional-grade, certified
              brands. <br />
              Here in Canada, my go-to pigments are from Solid Ink, Eternal Ink,
              and World Famous — depending on the color palette needed for your
              design.
            </p>
          </div>
        ),
      },
      {
        q: "How do you ensure everything is sterile and safe?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              Most of the materials I use during the session are single-use —
              including gloves, ink caps, machine covers, razors,
              needles/cartridges, and all protective wrap barriers. Most of them
              are opened in front of you, and after the session, everything is
              carefully disposed of in medical-grade waste containers.
            </p>
            <p>
              For any reusable parts, like machine grips, I use either chemical
              disinfection or heat sterilization between each client — always
              following professional hygiene standards.
            </p>
          </div>
        ),
      },
      {
        q: "Where is the studio located?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              The studio is located at: <br />
              The Terrace Studio <br />
              Unit 9, 1111 3 St SE, Calgary, AB T2G 2S8 <br />
            </p>
            <p>
              📍 Open in Google Maps <br />
              <a
                href="https://maps.app.goo.gl/KJCpHRe1YeVq5Muq9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://maps.app.goo.gl/KJCpHRe1YeVq5Muq9
              </a>
            </p>
          </div>
        ),
      },
      {
        q: "Can I come with a friend?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <p>
              If you&apos;d like to bring a friend or partner for support,
              especially if it’s your first tattoo — just let me know in
              advance. If the studio isn’t too busy that day, it’s usually not a
              problem!
            </p>
            <p>
              That said, I do recommend coming alone if you can. It helps create
              a calmer, more focused atmosphere and makes the session more
              comfortable for both of us.
            </p>
          </div>
        ),
      },
      {
        q: "Is there parking near the studio?",
        a: (
          <div className="prose max-w-none text-sm md:text-base text-black/80 space-y-4">
            <div className="space-y-4">
              <p className="text-xl text-black">
                The studio doesn’t have its own parking, but there are a few
                good options nearby:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Street parking is available around the studio (paid via meter
                  or app)
                </li>
                <li>
                  Impark Paid lot behind the studio — a great option if you want
                  something quick and easy.
                </li>
              </ul>
            </div>
            <p>
              Open Google Maps{" "}
              <a
                href="https://maps.app.goo.gl/zCtoR65iq3EVRkD79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://maps.app.goo.gl/zCtoR65iq3EVRkD79
              </a>
            </p>
            <p>
              I recommend arriving a bit early to find a good spot and avoid
              feeling rushed.
            </p>
          </div>
        ),
      },
    ],
  },
];

export function FAQSection() {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  return (
    <section id="faq" className="py-[52px] md:py-[92px]">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="max-w-[409px]">
            <Heading
              className="text-left"
              text={
                <>
                  Frequently
                  <br />
                  Asked Questions
                </>
              }
            />
          </div>
          <div className="max-w-[740px] w-full mt-12 md:mt-0 space-y-6">
            {categories.map((cat) => {
              const isActive = cat.id === activeCat;
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => setActiveCat(isActive ? "" : cat.id)}
                    className={`
                      w-full text-left p-[10px] md:p-[20px] rounded-[20px]
                      font-neue-met uppercase text-base md:text-[24px]
                      font-bold leading-none flex items-center justify-between
                      ${isActive
                        ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                        : "bg-gray-100 dark:bg-gray-800"
                      }
                    `}
                  >
                    <span>{cat.title}</span>
                    {isActive && <X size={16} />}
                  </button>

                  {isActive && (
                    <div className="mt-[20px] ml-5 space-y-4">
                      {cat.faqs.map((faq, idx) => (
                        <Disclosure key={idx}>
                          {({ open }) => (
                            <div key={faq.q}>
                              <DisclosureButton
                                className={`
                                  w-full flex justify-between items-center
                                  py-4 text-left
                                  text-base md:text-lg
                                  ${open
                                    ? "font-semibold"
                                    : "font-medium text-gray-700 dark:text-gray-300"
                                  }
                                `}
                              >
                                {faq.q}
                                {open ? (
                                  <Minus size={20} />
                                ) : (
                                  <Plus size={20} />
                                )}
                              </DisclosureButton>
                              <DisclosurePanel className="prose max-w-none text-sm md:text-base text-black pb-4">
                                {faq.a}
                              </DisclosurePanel>
                              <hr className="border-t border-gray-200 dark:border-gray-700" />
                            </div>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
