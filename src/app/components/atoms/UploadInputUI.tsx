// components/UploadInputUI.tsx
"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { UploadCloud } from "lucide-react";

export type UploadInputUIProps = {
  /** Атрибут id для input (если не передан — генерируется автоматом) */
  id?: string;
  /** Можно ли выбирать несколько файлов */
  multiple?: boolean;
  /** Ограничение по типам файлов, например "image/*" */
  accept?: string;
  /** Обработчик изменения — передаёт FileList или null */
  onChange?: (files: FileList | null) => void;
  /** Дополнительные классы для корневого лейбла */
  className?: string;
};

export const UploadInputUI = forwardRef<HTMLInputElement, UploadInputUIProps>(
  ({ id, multiple = true, accept, onChange, className }, ref) => {
    const inputId = id ?? `upload-input-${Math.random().toString(36).slice(2)}`;

    return (
      <label
        htmlFor={inputId}
        className={clsx(
          "flex flex-col items-center justify-center",
          "border-2 border-dashed border-gray-300 dark:border-gray-600",
          "rounded-xl px-6 py-9",
          "text-gray-500 dark:text-gray-400",
          "hover:bg-gray-50 dark:hover:bg-gray-800",
          "transition cursor-pointer",
          className
        )}
      >
        <div className="flex flex-col items-center gap-[5px] font-neue-mon">
          <UploadCloud
            size={51}
            color="rgba(0, 0, 0, 0.54)"
            strokeWidth={1}
            className="mb-[10px]"
          />
          <span className="text-sm text-center">
            Drag &amp; drop files or <span className="underline text-black">Browse</span>
          </span>
          <span className="text-xs text-center">
            Supported formates: JPEG, PNG, WebP, MP4, PDF
          </span>
        </div>
        <input
          id={inputId}
          ref={ref}
          type="file"
          multiple={multiple}
          accept={accept}
          className="sr-only"
          onChange={(e) => onChange?.(e.target.files)}
        />
      </label>
    );
  }
);

UploadInputUI.displayName = "UploadInputUI";
