import { describe, expect, it } from "vitest";
import "@/styles/globals.css";
import { Button } from ".";
import { render } from "@testing-library/react";

describe("Button", () => {
  // Renders button element with default styling
  it("should render button", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me").textContent).toBe("Click me");
  });

  //   Passes children content correctly to button element
  it("should render children content inside button", () => {
    const buttonText = "Button";
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  // Handles disabled state styling correctly
  it("should apply disabled class when disabled prop is true", () => {
    const { getByTestId } = render(
      <Button disabled data-testid="disabled">
        Click me
      </Button>
    );
    const button = getByTestId("disabled");
    console.log(button);
    expect(button).toHaveAttribute("disabled");
  });

  // Handles empty children prop
  it("should render button without content when children prop is empty", () => {
    const { container } = render(<Button></Button>);
    const button = container.querySelector("button");
    expect(button).toBeEmptyDOMElement();
  });
});
