import { KEYS } from "@/data/helpers/keys";
import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "./currencies.api";

const options = queryOptions({
  queryKey: KEYS.CURRENCIES,
  queryFn: async () => {
    const { data } = await fetchCurrencies();
    return Object.keys(data);
  },
});
const useFetchCurrencies = () => {
  const query = useQuery(options);
  return query;
};

const prefetchCurrencies = (queryClient: QueryClient) => {
  queryClient.prefetchQuery(options);
};

export { useFetchCurrencies, prefetchCurrencies };
