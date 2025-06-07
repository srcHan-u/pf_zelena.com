"use client";

import React, { forwardRef } from "react";
import ReactSelect, { Props as RSProps, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import clsx from "clsx";

export type Option = {
  value: string;
  label: string;
};

export type SelectUIProps = Omit<RSProps<Option, boolean>, "styles"> & {
  /** Лейбл над селектом */
  label?: string;
  /** Текст ошибки */
  error?: string;
  /** Классы обёртки */
  containerClassName?: string;
  /** Если нужно мультивыбор */
  isMulti?: boolean;
  /** Если нужно асинхронно подгружать опции */
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  /** Автозагрузка первых опций при монтировании (только для async) */
  defaultOptions?: boolean | Option[];

  isRequired?: boolean;
};

export const SelectUI = forwardRef<HTMLDivElement, SelectUIProps>(
  (
    {
      label,
      error,
      containerClassName,
      className,
      isRequired = false,
      placeholder = "Select…",
      isMulti = false,
      loadOptions,
      defaultOptions = false,
      ...props
    },
    ref
  ) => {
    const customStyles: StylesConfig<Option, boolean> = {
      control: (base, state) => ({
        ...base,
        backgroundColor: "transparent",
        border: "none",
        borderBottom: `1px solid ${error ? "#F87272" : state.isFocused ? "#1E3A8A" : "rgba(0,0,0,0.2)"
          }`,
        borderRadius: 0,
        boxShadow: "none",
        padding: "0px",
        minHeight: "auto",
        "&:hover": {
          borderBottom: `1px solid ${state.isFocused ? "#1E3A8A" : "rgba(0,0,0,0.3)"
            }`,
        },
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "4px 0px",
        display: "flex",
        alignItems: "center",
        minHeight: "auto",
      }),
      container: (base) => ({
        ...base,
        width: "100%",
        minWidth: "200px",
        maxWidth: "100%",
      }),
      menu: (base) => ({
        ...base,
        zIndex: 100,
      }),
      indicatorSeparator: () => ({ display: "none" }),
      dropdownIndicator: (base) => ({
        ...base,
        color: error ? "#F87272" : "#6B7280",
      }),
      placeholder: (base) => ({
        ...base,
        color: "rgba(0,0,0,0.31)",
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#111827",
      }),
      multiValue: (base) => ({
        ...base,
        backgroundColor: "#F3F4F6",
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: "#111827",
      }),
      multiValueRemove: (base) => ({
        ...base,
        ":hover": {
          backgroundColor: "#C2C2C2",
          color: "#fff",
        },
      }),
    };

    // Выбираем нужный компонент
    const SelectComponent = loadOptions ? AsyncSelect : ReactSelect;

    return (
      <div ref={ref} className={clsx("flex flex-col", containerClassName)}>
        {label && (
          <label className="mb-1 text-base font-medium font-neue-mon text-black/54 dark:text-gray-300">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}

        <SelectComponent
          styles={customStyles}
          className={clsx("react-select-container", className)}
          classNamePrefix="react-select"
          placeholder={placeholder}
          isClearable
          isMulti={isMulti}
          {...(loadOptions
            ? { loadOptions, defaultOptions }
            : { options: props.options })}
          {...props}
        />

        {error && (
          <p className="mt-1 text-xs text-red-500 font-neue-mon">{error}</p>
        )}
      </div>
    );
  }
);

SelectUI.displayName = "SelectUI";
