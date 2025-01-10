"use client";

import { useForm } from "react-hook-form";
import { FormType, SCHEMA } from "./useExchangeRateForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

export const useExchangeRateForm = () => {
  const { control, watch, formState, reset, setValue } = useForm<FormType>({
    resolver: zodResolver(SCHEMA),
    defaultValues: {
      amount: 1.0,
      base: undefined,
      target: undefined,
    },
  });

  const values = watch();
  const swap = useCallback(() => {
    const base = watch("base");
    const target = watch("target");
    setValue("base", target, { shouldDirty: true });
    setValue("target", base, { shouldDirty: true });
  }, [values.base, values.target, setValue]);

  return {
    formState,
    reset,
    setValue,
    values,
    control,
    swap,
  };
};
