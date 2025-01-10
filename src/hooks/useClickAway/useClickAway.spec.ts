import { describe, expect, it, vi } from "vitest";
import { fireEvent, renderHook } from "@testing-library/react";
import { useClickAway } from ".";
describe("useClickAway", () => {
  // Hook calls onClickAway when clicking outside the referenced element
  it("should call onClickAway when clicking outside referenced element", () => {
    const onClickAway = vi.fn();
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);

    renderHook(() => useClickAway({ ref, onClickAway }));

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    fireEvent.mouseDown(outsideElement);

    expect(onClickAway).toHaveBeenCalledTimes(1);

    document.body.removeChild(ref.current);
    document.body.removeChild(outsideElement);
  });

  // Hook handles null/undefined ref
  it("should not throw error when ref is null", () => {
    const onClickAway = vi.fn();
    const ref = { current: null };
    renderHook(() => useClickAway({ ref, onClickAway }));
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);
    fireEvent.mouseDown(outsideElement);
    expect(onClickAway).not.toHaveBeenCalled();
    document.body.removeChild(outsideElement);
  });
});
