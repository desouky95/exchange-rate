import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconButton } from ".";
import css from "./icon-button.module.css";

describe("IconButton", () => {
  // Renders button with default size 'md' when no size prop provided
  it("should render with md size class when size prop is not provided", () => {
    const { container } = render(<IconButton>Click me</IconButton>);
    const button = container.querySelector("button");
    expect(button).toHaveClass(css.md);
  });

  // Applies correct CSS classes based on provided size prop
  it("should apply correct size class when size prop is provided", () => {
    const { container } = render(<IconButton size="sm">Click me</IconButton>);
    const button = container.querySelector("button");
    expect(button).toHaveClass(css.sm);
  });

  // Handles empty/null children prop
  it("should render without children when children prop is null", () => {
    const { container } = render(<IconButton />);
    const button = container.querySelector("button");
    expect(button).toBeEmptyDOMElement();
  });
});
