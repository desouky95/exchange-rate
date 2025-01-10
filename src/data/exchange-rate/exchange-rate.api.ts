import { instance } from "@/services";

export const fetchExchangeRate = (base: string) =>
  instance.get<ExchangeRate>(`currencies/${base}.json`);
