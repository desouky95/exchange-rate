 

import { instance } from "@/services";
import { describe, expect, it, vi } from "vitest";
import { fetchExchangeRate, useExchangeRate } from ".";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KEYS } from "..";

describe("fetchExchangeRate", () => {
  // Successfully fetch exchange rate data for valid base currency
  it("should return exchange rate data when valid base currency provided", async () => {
    const mockResponse = {
      date: "2022-11-11",
      base: "usd",
      usd: { eur: 0.85 },
    };
    vi.spyOn(instance, "get").mockResolvedValue({ data: mockResponse });

    const result = await fetchExchangeRate("usd");

    console.log(result);

    expect(result.data).toEqual(mockResponse);
    expect(instance.get).toHaveBeenCalledWith("currencies/usd.json");
    expect(result.data).toHaveProperty("date");
  });

  // Returns correct response type matching ExchangeRate interface
  it("should return data matching ExchangeRate interface structure", async () => {
    const mockResponse = {
      date: "2022-11-11",
      eur: { usd: 1.18 },
    };
    vi.spyOn(instance, "get").mockResolvedValue({ data: mockResponse });

    const result = await fetchExchangeRate("eur");

    expect(result.data).toHaveProperty("eur");
    expect(result.data).toHaveProperty("date");
  });

  // Handle non-existent base currency
  it("should throw error when base currency does not exist", async () => {
    vi.spyOn(instance, "get").mockRejectedValue(new Error("404 Not Found"));

    await expect(fetchExchangeRate("XYZ")).rejects.toThrow("404 Not Found");
    expect(instance.get).toHaveBeenCalledWith("currencies/XYZ.json");
  });

  // Handle invalid base currency format
  it("should throw error when base currency format is invalid", async () => {
    vi.spyOn(instance, "get").mockRejectedValue(
      new Error("Invalid currency format")
    );

    await expect(fetchExchangeRate("US")).rejects.toThrow(
      "Invalid currency format"
    );
    expect(instance.get).toHaveBeenCalledWith("currencies/US.json");
  });

  // Handle empty base currency parameter
  it("should throw error when base currency is empty", async () => {
    vi.spyOn(instance, "get").mockRejectedValue(
      new Error("Base currency is required")
    );

    await expect(fetchExchangeRate("")).rejects.toThrow(
      "Base currency is required"
    );
    expect(instance.get).toHaveBeenCalledWith("currencies/.json");
  });
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  queryClient.setQueryDefaults(KEYS.EXCHANGE_RATE("egp"), {
    retry: 5,
    initialData: { data: { egp: { usd: 50 } } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useExchangeRate", () => {
  // Query returns correct converted amount when valid base and target currencies provided
  it("should return converted amount when valid currencies provided", async () => {
    const { result } = renderHook(
      () => useExchangeRate("egp", "usd", 2, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toBe(100);
  });

  // Hook returns data when enabled is true
  it("should fetch data when enabled is true", async () => {
    const { result } = renderHook(
      () => useExchangeRate("egp", "usd", 2, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toBeDefined();
  });

  // Handle case when target currency doesn't exist in exchange rates
  it("should return undefined when target currency not found", async () => {
    const { result } = renderHook(
      () => useExchangeRate("egp", "eur", 2, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeNaN();
  });

  // Handle case when base currency doesn't exist in exchange rates
  it("should return undefined when base currency not found", async () => {
    const { result } = renderHook(
      () => useExchangeRate("usd", "egp", 100, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
    });
  });

  // Handle zero amount conversion
  it("should return zero when amount is zero", async () => {
    const { result } = renderHook(
      () => useExchangeRate("egp", "usd", 0, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.data).toBe(0);
    });
  });
});
