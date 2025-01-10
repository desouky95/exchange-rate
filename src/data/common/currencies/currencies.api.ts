import { instance } from "@/services";

export const fetchCurrencies = () => {
  return instance.get<CurrenciesResponse>("currencies.json");
};
