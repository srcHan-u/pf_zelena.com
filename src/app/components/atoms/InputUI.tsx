"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type InputUIProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Подпись над полем */
  label?: string;
  /** Иконка слева от поля */
  icon?: {
    /** Иконка */
    value: ReactNode;
    placement?: "left" | "right";
  };
  /** Текст ошибки */
  error?: string;
  /** Дополнительные классы для контейнера */
  containerClassName?: string;

  required?: boolean;
};

/**
 * InputUI — обнуляем дефолты у input,
 * и даём классы для стилизации через Tailwind.
 */
export const InputUI = forwardRef<HTMLInputElement, InputUIProps>(
  (
    {
      label,
      icon: { value: iconValue, placement: iconPlacement = "left" } = {},
      error,
      className,
      required,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `custom-input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={clsx("flex flex-col", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 text-base font-medium font-neue-mon text-black/54"
          >
            {label}

            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {iconValue && (
            <div
              className={clsx(
                "absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-400",
                iconPlacement === "right" && "right-0 left-auto pl-0",
                iconPlacement === "left" && "right-auto"
              )}
            >
              {iconValue}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            {...props}
            className={clsx(
              "m-0 p-0 bg-transparent outline-none appearance-none font-inherit text-inherit",
              "border-b border-black/20 focus:border-primary focus:ring-0",
              "w-full py-2 pr-3",
              "placeholder:text-black/31 placeholder:opacity-100",
              "transition duration-200 ease-in-out",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:border-red-500",
              iconValue && iconPlacement === "left" && "pl-10",
              className
            )}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 font-neue-mon">{error}</p>
        )}
      </div>
    );
  }
);

InputUI.displayName = "InputUI";
