"use client";
import { FormControl, Loader, Select } from "@/components";
import { useFetchCurrencies } from "@/data";
import css from "./currencies-select.module.css";
export const CurrencySelect = ({
  label,
  ...props
}: SelectProps<string> & Pick<FormControlProps, "label">) => {
  const { data, isLoading } = useFetchCurrencies();

  return (
    <FormControl label={label ?? "Currency"}>
      <Select.Root
        {...props}
        renderPlaceholder={() =>
          isLoading ? (
            <span className="flex justify-center w-full">
              <Loader />
            </span>
          ) : (
            "Select a currency"
          )
        }
        value={props.value}
        onChange={props.onChange}
      >
        {data?.map((currency) => (
          <Select.Item key={currency} value={currency}>
            <span className={css.item}>{currency}</span>
          </Select.Item>
        ))}
      </Select.Root>
    </FormControl>
  );
};
