import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEYS } from "..";
import { fetchExchangeRate } from "./exchange-rate.api";

const options = (base: string, enabled: boolean) =>
  queryOptions({
    queryKey: KEYS.EXCHANGE_RATE(base),
    queryFn: () => fetchExchangeRate(base),
    staleTime: 2 * 60 * 1000,
    enabled,
  });
export const useExchangeRate = (
  base: string,
  target: string,
  amount: number,
  enabled: boolean
) => {
  return useQuery({
    ...options(base, enabled),
    select(data) {
      const targetRate = data.data[base][target];
      return targetRate * amount;
    },
  });
};
