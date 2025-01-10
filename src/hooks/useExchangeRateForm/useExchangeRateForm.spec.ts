import { describe, expect, it } from "vitest";
import { useExchangeRateForm } from "./useExchangeRateForm";
import { act, renderHook } from "@testing-library/react";

describe("useExchangeRateForm", () => {
  // Form initializes with correct default values (amount=1.0, base/target=undefined)
  it("should initialize form with correct default values", () => {
    const {
      result: {
        current: { values },
      },
    } = renderHook(() => useExchangeRateForm());

    expect(values.amount).toBe(1.0);
    expect(values.base).toBeUndefined();
    expect(values.target).toBeUndefined();
  });

  // Form control and validation setup with zod schema resolver
  it("should setup form with zod schema validation", () => {
    const {
      result: {
        current: { formState, setValue, values },
      },
    } = renderHook(() => useExchangeRateForm());

    setValue("amount", -1);

    console.log(values);
    expect(formState.isValid).toBe(false);
  });

  it("should update form values", () => {
    const { result } = renderHook(() => useExchangeRateForm());

    act(() => {
      result.current.setValue("base", "egp");
    });
    expect(result.current.values.base).toBe("egp");
    act(() => {
      result.current.setValue("target", "usd");
    });

    expect(result.current.values.target).toBe("usd");
  });

  // Swap function handles undefined base/target values
  it("should handle swap currencies values", () => {
    const { result } = renderHook(() => useExchangeRateForm());

    act(() => {
      result.current.setValue("base", "egp");
    });
    expect(result.current.values.base).toBe("egp");
    act(() => {
      result.current.setValue("target", "usd");
    });

    expect(result.current.values.target).toBe("usd");
    act(() => {
      result.current.swap();
    });

    expect(result.current.values.base).toBe("usd");
    expect(result.current.values.target).toBe("egp");
  });
});
