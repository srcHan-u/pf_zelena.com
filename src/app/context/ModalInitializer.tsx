"use client";

import { useEffect } from "react";
import { useModal } from "./ModalContext";

type Options = {
  selectOptions?: { value: string; label: string }[];
};

export function ModalInitializer({ options }: { options: Options }) {
  const { setOptions } = useModal();
  useEffect(() => {
    setOptions({
      selectOptions: options?.selectOptions || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.selectOptions]);
  return null;
}
