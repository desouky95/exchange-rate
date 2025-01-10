"use client";
import { Button, FormControl, Icon, IconButton } from "@/components";
import { CurrencySelect } from "..";
import { Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useExchangeRate } from "@/data/exchange-rate";
import { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { useExchangeRateForm } from "@/hooks/useExchangeRateForm/useExchangeRateForm";
export const ExchangeForm = () => {
  const { control, formState, reset, swap, values } = useExchangeRateForm();

  const { data, isFetching, isFetched } = useExchangeRate(
    values.base,
    values.target,
    values.amount,
    formState.isValid
  );

  const [trigger, setTrigger] = useState(false);
  const swapClassNames = clsx("flex justify-center", {
    "animate-spin": trigger,
  });

  const handleSwap = () => {
    swap();
    setTimeout(() => setTrigger(false), 1000);
  };

  return (
    <div className="grid justify-items-start gap-4 bg-white p-10 rounded-lg w-[90vw] md:w-auto">
      <div className="flex items-stretch gap-4 flex-col md:flex-row md:items-end w-full">
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <FormControl
              label="Amount"
              step={0.01}
              min={1.0}
              type="number"
              {...field}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                field.onChange(ev.target.valueAsNumber);
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="base"
          render={({ field }) => (
            <CurrencySelect
              label="From"
              {...field}
              onChange={(ev) => {
                console.log({ ev });
                field.onChange(ev);
              }}
            />
          )}
        />
        <span className={swapClassNames}>
          <IconButton
            size="lg"
            onClick={() => {
              setTrigger(true);
              handleSwap();
            }}
          >
            <Icon.Primitive color="primary">
              <Icon.Swap />
            </Icon.Primitive>
          </IconButton>
        </span>
        <Controller
          control={control}
          name="target"
          render={({ field }) => (
            <CurrencySelect
              label="To"
              {...field}
              onChange={(ev) => {
                field.onChange(ev);
              }}
            />
          )}
        />
      </div>
      <Button disabled={!formState.isDirty} onClick={() => reset()}>
        Reset
      </Button>

      <div>
        {isFetching && !isFetched && <div>Loading...</div>}
        {!isFetching && !!data && formState.isValid && (
          <>
            <span>{values.amount}</span>{" "}
            <span className="uppercase">{values.base}</span> equals{" "}
            <span>{data}</span>{" "}
            <span className="uppercase">{values.target}</span>
          </>
        )}
      </div>
      <DevTool control={control} />
    </div>
  );
};
