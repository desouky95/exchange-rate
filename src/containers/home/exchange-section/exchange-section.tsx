import { prefetchCurrencies } from "@/data";
import { getQueryClient } from "@/utils";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ExchangeForm } from "./components/exchange-form";
import "./exchange-section.css";

export const ExchangeSection = () => {
  const queryClient = getQueryClient();
  prefetchCurrencies(queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="container mx-auto h-full">
        <div className="h-full flex flex-col items-center justify-center gap-20 container-image">
          <h2 className="text-white text-5xl font-bold">Money Exchange</h2>
          <ExchangeForm />
        </div>
      </section>
    </HydrationBoundary>
  );
};
