"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Transition,
  DialogTitle,
  DialogBackdrop,
  TransitionChild,
  Description,
} from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsultationSchema } from "./schema";
import { X } from "lucide-react";
import { useModal } from "@/app/context/ModalContext";
import Image from "next/image";
import { ButtonUI } from "@components/atoms/Button";
import { InputUI } from "@components/atoms/InputUI";
import { UploadInputUI } from "@components/atoms/UploadInputUI";
import { z } from "zod";
import { CalendarInputUI } from "@components/molecules/CalendarInputUI";
import { format } from "date-fns";
import { SelectUI } from "@components/atoms/SelectUI";
import { LoaderUI } from "@components/atoms/LoaderUI";

export type ConsultationModalFormData = z.infer<typeof ConsultationSchema>;

export type ConsultationModalInitialValues = {
  size?: string;
  sizeUnit?: "cm" | "inch";
  firstName?: string;
  lastName?: string;
  idea?: string;
  placement?: string[];
  email?: string;
  phone?: string;
  date?: string | undefined;
  inspiration?: FileList | null;
  whichCity?: string;
  whereDidYouFindMe?: string;
};

type Props = {
  initialValues?: ConsultationModalInitialValues;
};

export function ConsultationModal(
  { initialValues }: Props = { initialValues: undefined }
) {
  const { isOpen, close, options } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ConsultationModalFormData>({
    resolver: zodResolver(ConsultationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        sizeUnit: initialValues?.sizeUnit ?? "cm",
      });
    }
  }, [initialValues]);

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setPreviews([]);
      return;
    }

    if (initialValues?.inspiration) {
      const fileList = initialValues.inspiration;
      const urls: string[] = Array.from(fileList).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(urls);

      return () => {
        urls.forEach((u) => URL.revokeObjectURL(u));
      };
    }
  }, [initialValues?.inspiration, isOpen]);

  const onSubmit = async (data: ConsultationModalFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "inspiration") {
        if (value) {
          const files = value as FileList;
          for (let i = 0; i < files.length; i++) {
            formData.append("inspiration", files[i]);
          }
        }
      } else if (key === "placement") {
        formData.append(
          key,
          (value as string[]).map((v) => v.replace("_", " ").trim()).join(", ")
        );
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      setIsLoading(true);
      const res = await fetch("/api/telegram", {
        method: "POST",
        body: formData,
      });
      setIsLoading(false);
      if (!res.ok) throw new Error("Network response was not ok");
      handleClose();
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const currentFL: FileList | null = getValues("inspiration");
    const dt = new DataTransfer();

    if (currentFL) {
      Array.from(currentFL).forEach((f) => dt.items.add(f));
    }
    Array.from(files).forEach((f) => dt.items.add(f));

    setValue("inspiration", dt.files);

    const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveFile = (index: number) => {
    setPreviews((prev) => {
      const newPreviews = [...prev];
      const [removedUrl] = newPreviews.splice(index, 1);

      URL.revokeObjectURL(removedUrl);
      return newPreviews;
    });

    const currentFileList: FileList | null = getValues("inspiration");
    if (!currentFileList) return;

    const arrFiles = Array.from(currentFileList);
    arrFiles.splice(index, 1);

    const dt = new DataTransfer();
    arrFiles.forEach((file) => dt.items.add(file));
    setValue("inspiration", dt.files);
  };

  const handleClearAll = () => {
    previews.forEach((u) => URL.revokeObjectURL(u));
    setPreviews([]);
    reset({
      size: "",
      sizeUnit: "cm",
      firstName: "",
      lastName: "",
      idea: "",
      placement: [],
      email: "",
      phone: "",
      date: undefined,
      inspiration: null,
      whichCity: "",
      whereDidYouFindMe: "",
    });
  };

  const handleClose = () => {
    handleClearAll();
    close();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-screen items-center justify-center px-2 py-2 md:px-4 md:py-6 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop
              className="fixed inset-0 bg-black/50"
              onClick={handleClose}
            />
          </TransitionChild>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <div
              className={`
                inline-block align-middle
                bg-white dark:bg-gray-900
                rounded-3xl text-left overflow-hidden shadow-xl
                w-full max-w-[1088px]
                max-h-[90vh] min-h-[500px] overflow-y-auto
                py-18 px-6 lg:py-22 lg:px-32 relative
                no-scrollbar
              `}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>

              <DialogTitle className="text-[24px] sm:text-[32px] md:text-[44px] lg:text-[58px] font-neue-met font-bold text-center mb-6">
                Get a consultation
              </DialogTitle>
              <Description className="text-center text-sm md:text-base font-medium mb-10">
                Fill out the form below and I will get back to you as soon as
                possible.
              </Description>
              {isLoading ? (
                <LoaderUI />
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <InputUI
                    label="First name"
                    required
                    type="text"
                    {...register("firstName")}
                    error={errors.firstName?.message}
                    placeholder="Enter your first name"
                  />

                  <InputUI
                    label="Last name"
                    required
                    type="text"
                    {...register("lastName")}
                    error={errors.lastName?.message}
                    placeholder="Enter your last name"
                  />

                  <InputUI
                    label="What's your tattoo idea?"
                    required
                    type="text"
                    placeholder="Describe main details you would like to see in design"
                    {...register("idea")}
                    error={errors.idea?.message}
                    containerClassName="md:col-span-2"
                  />

                  <Controller
                    name="placement"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      const unitsOptions = [
                        { value: "forearm", label: "Forearm" },
                        { value: "upper_arm", label: "Upper arm" },
                        { value: "leg", label: "Leg" },
                        { value: "back", label: "Back" },
                        { value: "chest", label: "Chest" },
                        { value: "thigh", label: "Thigh" },
                        { value: "calf", label: "Calf" },
                        { value: "ankle", label: "Ankle" },
                        { value: "shoulder", label: "Shoulder" },
                        { value: "other", label: "Other" },
                        { value: "unsure", label: "Unsure" },
                        { value: "ribcage", label: "Ribcage" },
                        { value: "side", label: "Side" },
                        { value: "hip", label: "Hip" },
                        { value: "buttocks", label: "Buttocks" },
                        { value: "elbow", label: "Elbow" },
                        { value: "collarbone", label: "Collarbone" },
                      ];

                      const selectedOption = unitsOptions.filter(
                        (opt) =>
                          Array.isArray(field.value) &&
                          field.value.includes(opt.value)
                      );
                      return (
                        <SelectUI
                          isRequired
                          isMulti
                          placeholder="forearm, upper arm, leg, etc."
                          label="Placement"
                          error={error?.message}
                          options={unitsOptions}
                          value={selectedOption}
                          onChange={(val) => {
                            const valuesArray =
                              val && Array.isArray(val)
                                ? val.map((v) => v.value)
                                : [];
                            field.onChange(valuesArray);
                          }}
                        />
                      );
                    }}
                  />

                  <div className="flex gap-4 flex-col md:flex-row">
                    <InputUI
                      required
                      label="Approximately size"
                      type="text"
                      {...register("size")}
                      error={errors.size?.message}
                      placeholder="inch or centimeters"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (value && !/^\d*\.?\d*$/.test(value)) {
                          e.target.value = value.replace(/[^0-9.]/g, "");
                        }
                      }}
                      className="flex-1"
                    />
                    <Controller
                      name="sizeUnit"
                      control={control}
                      defaultValue="cm"
                      render={({ field, fieldState: { error } }) => {
                        const unitsOptions = [
                          { value: "cm", label: "Centimeters" },
                          { value: "inch", label: "Inches" },
                        ];

                        const selectedOption = unitsOptions.find(
                          (opt) => opt.value === field.value
                        );

                        return (
                          <SelectUI
                            isRequired
                            label="Size unit"
                            error={error?.message}
                            options={unitsOptions}
                            value={selectedOption}
                            onChange={(val) => {
                              if (!val || Array.isArray(val)) {
                                field.onChange("");
                                return;
                              }

                              const option = val as {
                                value: string;
                                label: string;
                              };

                              field.onChange(option.value);
                            }}
                          />
                        );
                      }}
                    />
                  </div>

                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <CalendarInputUI
                        required
                        label="Preferable day for an appointment?"
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(d: Date) =>
                          field.onChange(format(d, "yyyy-MM-dd"))
                        }
                        error={errors.date?.message as string}
                      />
                    )}
                  />

                  <div className="md:col-span-2">
                    <label className="block text-base font-medium font-neue-mon text-black/54 mb-2">
                      Inspiration<span className="text-red-500">*</span>
                    </label>

                    <p className="text-xs text-gray-500 mb-4">
                      Add one or more photos or sketches you like.
                    </p>
                    <Controller
                      control={control}
                      name="inspiration"
                      render={() => (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[0, 1, 2].map((i) => (
                              <UploadInputUI
                                key={i}
                                multiple
                                accept="image/png, image/jpeg, image/webp, mpeg, file/pdf"
                                onChange={(files: FileList | null) => {
                                  if (!files) return;
                                  handleFileChange(files);
                                }}
                              />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3 mt-8">
                            {Object.values(previews)
                              .flat()
                              .map((url, idx) => (
                                <div key={idx} className="relative">
                                  <button
                                    type="button"
                                    className="absolute -top-3 -right-2 text-white z-2 w-6 h-6 flex items-center justify-center rounded-full shadow-xl bg-[#C2C2C2] focus:outline-none hover:transform hover:-translate-y-[2px] transition-transform duration-200"
                                    onClick={() => handleRemoveFile(idx)}
                                  >
                                    <X size={16} />
                                  </button>
                                  <div className="w-20 h-20 relative rounded-md overflow-hidden">
                                    <Image
                                      src={url}
                                      alt={`Preview ${idx} of inspiration image ${url}`}
                                      fill
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                          {errors.inspiration && (
                            <p className="text-red-500 text-xs mt-1">
                              {typeof errors.inspiration.message === "string"
                                ? errors.inspiration.message
                                : ""}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <Controller
                    name="whichCity"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <SelectUI
                          isRequired
                          error={error?.message}
                          label="In which city would you like to get a tattoo?"
                          placeholder="Choose a city"
                          options={options?.selectOptions || ""}
                          onChange={(val) => {
                            if (!val) {
                              field.onChange("");
                              return;
                            }

                            const option = val as {
                              value: string;
                              label: string;
                            };
                            field.onChange(option.value);
                          }}
                          containerClassName="md:col-span-2"
                        />
                      );
                    }}
                  />

                  <Controller
                    name="whereDidYouFindMe"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      const unitsOptions = [
                        {
                          value: "instagram",
                          label: "Advertising on Instagram",
                        },
                        { value: "google", label: "Google search" },
                        {
                          value: "recommendations",
                          label: "Recommendations, colleagues, etc.",
                        },
                        { value: "other", label: "Other" },
                      ];

                      const selectedOption = unitsOptions.find(
                        (opt) => opt.value === field.value
                      );

                      return (
                        <SelectUI
                          isRequired
                          label="How did you find out about me?"
                          error={error?.message}
                          placeholder="Choose an option"
                          options={unitsOptions}
                          value={selectedOption}
                          onChange={(val) => {
                            if (!val || Array.isArray(val)) {
                              field.onChange("");
                              return;
                            }

                            const option = val as {
                              value: string;
                              label: string;
                            };
                            field.onChange(option.value);
                          }}
                          containerClassName="md:col-span-2"
                        />
                      );
                    }}
                  />

                  <InputUI
                    label="E-mail"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    placeholder="Enter your e-mail"
                    required
                  />

                  <InputUI
                    label="Phone number"
                    type="tel"
                    {...register("phone")}
                    error={errors.phone?.message}
                    placeholder="Enter your phone number"
                    required
                  />

                  <div className="md:col-span-2 flex items-center justify-center mt-4">
                    <ButtonUI
                      type="contained"
                      color="black"
                      text="Get a consultation"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isLoading}
                    />
                  </div>
                </form>
              )}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
