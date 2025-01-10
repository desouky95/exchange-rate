"use client";
import { FormControl, Icon } from "@/components";
import { useFetchCurrencies } from "@/data";
import { useExchangeRate } from "@/data/exchange-rate";
import { useExchangeRateForm } from "@/hooks/useExchangeRateForm/useExchangeRateForm";
import { DevTool } from "@hookform/devtools";
import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Select,
  TextField,
} from "@radix-ui/themes";
import { Controller } from "react-hook-form";
import "./exchange-radix-section.css";
export const ExchangeRadixSection = () => {
  const { control, formState, reset, values, swap } = useExchangeRateForm();
  const { data: currencies } = useFetchCurrencies();

  const { data, isFetching } = useExchangeRate(
    values.base,
    values.target,
    values.amount,
    formState.isValid
  );

  return (
    <Flex
      align={"center"}
      justify={"center"}
      height={"100%"}
      className="container-image"
    >
      <Card size={"5"} variant="classic">
        <Flex
          align={{ initial: "stretch", sm: "start" }}
          justify={"center"}
          direction={"column"}
          gap={"3"}
        >
          <Flex
            align={{ initial: "stretch", sm: "end" }}
            justify={"center"}
            gap={"3"}
            direction={{ initial: "column", sm: "row" }}
          >
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <FormControl label="Amount">
                  <TextField.Root
                    type="number"
                    min={1}
                    step={0.01}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="base"
              render={({ field }) => (
                <FormControl label="From">
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      placeholder="Select a currency"
                      value={field.value}
                    >
                      <Box minWidth={"140px"}>
                        {field.value && (
                          <span className="uppercase font-bold">
                            {field.value}
                          </span>
                        )}
                        {!field.value && "Select a currency"}
                      </Box>
                    </Select.Trigger>

                    <Select.Content>
                      {currencies?.map((currency) => (
                        <Box minWidth={"200"}>
                          <Select.Item key={currency} value={currency}>
                            <span className="uppercase font-bold">
                              {currency}
                            </span>
                          </Select.Item>
                        </Box>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </FormControl>
              )}
            />
            <Flex justify={"center"}>
              <IconButton variant="soft" onClick={swap}>
                <Icon.Swap size={20} />
              </IconButton>
            </Flex>
            <Controller
              control={control}
              name="target"
              render={({ field }) => (
                <FormControl label="To">
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      placeholder="Select a currency"
                      value={field.value}
                    >
                      <Box minWidth={"140px"}>
                        {field.value && (
                          <span className="uppercase font-bold">
                            {field.value}
                          </span>
                        )}
                        {!field.value && "Select a currency"}
                      </Box>
                    </Select.Trigger>

                    <Select.Content>
                      {currencies?.map((currency) => (
                        <Box minWidth={"200"}>
                          <Select.Item key={currency} value={currency}>
                            <span className="uppercase font-bold">
                              {currency}
                            </span>
                          </Select.Item>
                        </Box>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </FormControl>
              )}
            />
          </Flex>
          <Button disabled={!formState.isDirty} onClick={() => reset()}>
            Reset
          </Button>
          <Box>
            {isFetching && <div>Loading...</div>}
            {!isFetching && !!data && formState.isValid && (
              <>
                <span className="text-primary font-bold">{values.amount}</span>{" "}
                <span className="uppercase font-bold">{values.base}</span>{" "}
                equals <span className="text-primary font-bold">{data}</span>{" "}
                <span className="uppercase font-bold">{values.target}</span>
              </>
            )}
          </Box>
        </Flex>
      </Card>
      <DevTool control={control} />
    </Flex>
  );
};
