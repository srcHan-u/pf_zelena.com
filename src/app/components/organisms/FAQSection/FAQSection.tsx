"use client";

import React, { useState, Fragment } from "react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Plus, Minus, X } from "lucide-react";
import { Heading } from "@components/atoms/Heading";
import { categories } from "./data";

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
