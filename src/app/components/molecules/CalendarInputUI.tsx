"use client";

import { forwardRef, useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Calendar } from "lucide-react";
import { getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import clsx from "clsx";
import dynamic from "next/dynamic";

export type CalendarInputUIProps = {
  /** Метка поля */
  label?: string;
  /** Ошибка валидации */
  error?: string;
  /** Текущее значение даты */
  value?: Date;
  /** Событие при выборе */
  onChange?: (date: Date) => void;
  /** Дополнительные классы для контейнера */
  className?: string;

  required?: boolean;
};

/**
 * Календарь в поповере + текстовый input с formatted date
 */
const LazyDayPicker = dynamic(
  () => import("react-day-picker").then((mod) => mod.DayPicker),
  {
    ssr: false,
    loading: () => (
      <div className="w-[332px] h-64 flex items-center justify-center">
        Loading...
      </div>
    ),
  }
);
export const CalendarInputUI = forwardRef<
  HTMLInputElement,
  CalendarInputUIProps
>(({ label, error, value, onChange, className, required, ...props }, ref) => {
  const defaultClassNames = getDefaultClassNames();

  const [selected, setSelected] = useState<Date | undefined>(value);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const formatted = selected ? format(selected, "yyyy-MM-dd") : "";

  return (
    <div className={clsx("flex flex-col", className)}>
      {label && (
        <label className="mb-1 text-base font-medium font-neue-mon text-black/54 dark:text-gray-300">
          {label}

          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <Popover className="relative">
        <PopoverButton
          className={clsx(
            "w-full text-left border-b border-gray-300 py-2 pr-3",
            "focus:border-primary focus:ring-0",
            "bg-transparent text-base font-medium font-neue-mon",
            "relative"
          )}
        >
          {selected ? format(selected, "PPP") : "Select a date…"}
          <Calendar
            size={27}
            color="#C2C2C2"
            strokeWidth={1}
            className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none"
          />
        </PopoverButton>

        <PopoverPanel className="absolute z-10 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 border border-black/20">
          <LazyDayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              setSelected(d || undefined);
              if (d) {
                onChange?.(d);
              }
            }}
            classNames={{
              today: `bg-[#C2C2C2] text-white`,
              selected: `bg-amber-500 border-amber-500 text-white`,
              root: `${defaultClassNames.root} p-3`,
              chevron: `fill-black`,
            }}
          />
        </PopoverPanel>
      </Popover>

      <input ref={ref} type="hidden" value={formatted} {...props} />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

CalendarInputUI.displayName = "CalendarInputUI";
