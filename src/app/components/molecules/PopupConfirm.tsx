"use client";

import { useEffect } from "react";
import { ButtonUI } from "@components/atoms/Button";

const textVariant = {
  success: "Thank you for your request! I will contact you within 1–2 days.",
  error: "I always reply within 1–2 days, but if you don't get any response, you can always message me on Instagram or email",
};

export type PopupConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  variant: "success" | "error";
};


export function PopupConfirm({ isOpen, onClose, variant }: PopupConfirmProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl p-8 md:p-12 max-w-md mx-4 shadow-2xl">
        <p className="text-black font-neue-mon text-base md:text-lg leading-relaxed mb-8 text-center">
          {textVariant[variant]}
        </p>

        <div className="flex justify-center">
          <ButtonUI
            text="Go back"
            type="contained"
            color="black"
            onClick={onClose}
            className="min-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
}
