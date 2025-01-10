import { describe, expect, it } from "vitest";
import { Select } from ".";
import { fireEvent, render } from "@testing-library/react";
import css from "./select.module.css";
describe("Select", () => {
  // Select opens and closes when clicking the button
  it("should toggle open state when button is clicked", () => {
    const { getByRole } = render(
      <Select.Root>
        <Select.Item value="1">Option 1</Select.Item>
      </Select.Root>
    );

    const button = getByRole("button");
    expect(button).toHaveClass(css.placeholder);

    fireEvent.click(button);
    expect(button).toHaveClass(css.open);

    fireEvent.click(button);
    expect(button).not.toHaveClass("open");
  });

  // Select handles null/undefined values correctly
  it("should render placeholder when value is null", () => {
    const placeholder = "Select an option";
    const { getByTestId } = render(
      <Select.Root
        placeholder={placeholder}
        triggerProps={{ "data-testid": "button" }}
      >
        <Select.Item value="1">Option 1</Select.Item>
      </Select.Root>
    );

    const button = getByTestId("button");
    expect(button).toHaveTextContent(placeholder);
  });
});
