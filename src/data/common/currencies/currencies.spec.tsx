import { instance } from "@/services";
import { describe, expect, it, vi } from "vitest";
import { fetchCurrencies } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KEYS } from "@/data";

describe("fetchCurrencies", () => {
  // Successfully fetch currencies and return response
  it("should successfully fetch and return currencies data", async () => {
    const mockResponse = { USD: "US Dollar", EUR: "Euro" };
    vi.spyOn(instance, "get").mockResolvedValue({ data: mockResponse });

    const result = await fetchCurrencies();

    expect(result.data).toEqual(mockResponse);
    expect(instance.get).toHaveBeenCalledWith("currencies.json");
  });

  // Return correct response type matching CurrenciesResponse interface
  it("should return data matching CurrenciesResponse type", async () => {
    const mockResponse: CurrenciesResponse = { USD: "US Dollar" };
    vi.spyOn(instance, "get").mockResolvedValue({ data: mockResponse });

    const result = await fetchCurrencies();

    expect(typeof result.data).toBe("object");
    expect(typeof Object.keys(result.data)[0]).toBe("string");
    expect(typeof Object.values(result.data)[0]).toBe("string");
  });

  // Handle empty response from API
  it("should handle empty response from API", async () => {
    vi.spyOn(instance, "get").mockResolvedValue({ data: {} });

    const result = await fetchCurrencies();

    expect(result.data).toEqual({});
    expect(Object.keys(result.data).length).toBe(0);
  });

  // Handle malformed JSON response
  it("should throw error when receiving malformed JSON", async () => {
    vi.spyOn(instance, "get").mockRejectedValue(new Error("Invalid JSON"));

    await expect(fetchCurrencies()).rejects.toThrow("Invalid JSON");
  });

  // Handle network timeout
  it("should handle network timeout error", async () => {
    vi.spyOn(instance, "get").mockRejectedValue(new Error("Network timeout"));

    await expect(fetchCurrencies()).rejects.toThrow("Network timeout");
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
  queryClient.setQueryDefaults(KEYS.CURRENCIES, {
    retry: 5,
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
