import { fireEvent, render, screen } from "@testing-library/react";

import Button from "@/components/Button/Button";
import React from "react";

describe("Button", () => {
  it("renders with default props and children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
    expect(screen.getByRole("button")).toHaveClass("btn primary");
  });

  it('applies small class when "small" is true', () => {
    render(<Button small>Small Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("small");
  });

  it('displays a spinner when "loading" is true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  it("renders icon if provided", () => {
    render(<Button icon={<span data-testid="mock-icon" />}>With Icon</Button>);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it('is disabled when "disabled" is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies additional className when provided", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it('respects the "variant" prop', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("secondary");
  });
});
