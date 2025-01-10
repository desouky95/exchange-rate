import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from ".";

import css from "./input.module.css";

describe("Input", () => {
  // Renders input element with correct CSS class from module
  it("should render with css module class", () => {
    const { container } = render(<Input />);

    const input = container.querySelector("input");

    expect(input).toHaveClass(css.input);
  });

  // Renders input element with placeholder
  it("should render with placeholder", () => {
    const { container } = render(<Input placeholder="Input placeholder" />);

    const input = container.querySelector("input");

    expect(input).toHaveAttribute("placeholder", "Input placeholder");
  });
});
