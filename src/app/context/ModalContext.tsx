"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ConsultationModal } from "@components/organisms/ConsultationModal/ConsultationModal";
import { ConsultationModalInitialValues } from "@components/organisms/ConsultationModal/ConsultationModal";

type ModalContextType = {
  open: (values?: ConsultationModalInitialValues) => void;
  close: () => void;
  isOpen: boolean;
  initialValues?: ConsultationModalInitialValues;
  options?: {
    selectOptions?: { value: string; label: string }[];
  };
  setOptions: React.Dispatch<
    React.SetStateAction<{
      selectOptions?: { value: string; label: string }[];
    }>
  >;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<{
    selectOptions?: { value: string; label: string }[];
  }>({});
  const [initialValues, setInitialValues] = useState<
    ConsultationModalInitialValues | undefined
  >(undefined);

  const open = (values?: ConsultationModalInitialValues) => {
    setInitialValues(values);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{ isOpen, open, close, initialValues, options, setOptions }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export function ModalHost() {
  const { initialValues } = useModal();

  return <ConsultationModal initialValues={initialValues} />;
}
