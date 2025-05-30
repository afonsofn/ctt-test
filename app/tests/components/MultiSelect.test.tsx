import { fireEvent, render, screen } from "@testing-library/react";

import { CATEGORIES } from "@/features/products/constants/categories";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import { MultiSelectProps } from "@/components/MultiSelect/MultiSelect.types";
import React from "react";

const setup = (customProps?: Partial<MultiSelectProps>) => {
  const onChange = jest.fn();
  const props: MultiSelectProps = {
    options: CATEGORIES,
    selected: [],
    onChange,
    label: "Select Categories",
    placeholder: "Choose...",
    ...customProps,
  };

  render(<MultiSelect {...props} />);
  return { onChange };
};

describe("MultiSelect", () => {
  it("renders label and placeholder correctly", () => {
    setup();

    expect(screen.getByText("Select Categories")).toBeInTheDocument();
    expect(screen.getByTestId("multi-select-placeholder")).toHaveTextContent(
      "Choose..."
    );
  });

  it("opens options on click and closes on second click", () => {
    setup();

    const display = screen.getByTestId("multi-select");

    fireEvent.click(display);
    expect(screen.getByTestId("checkbox-input-tech")).toBeInTheDocument();

    fireEvent.click(display);
    expect(screen.queryByTestId("checkbox-input-tech")).not.toBeInTheDocument();
  });

  it("calls onChange with correct values when selecting", () => {
    const { onChange } = setup();

    fireEvent.click(screen.getByTestId("multi-select"));

    const techCheckbox = screen.getByTestId("checkbox-input-tech");
    fireEvent.click(techCheckbox);

    expect(onChange).toHaveBeenCalledWith(["tech"]);
  });

  it("calls onChange with correct values when unselecting", () => {
    const { onChange } = setup({ selected: ["tech"] });

    fireEvent.click(screen.getByTestId("multi-select"));
    fireEvent.click(screen.getByTestId("checkbox-input-tech"));

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("displays selected labels correctly", () => {
    setup({ selected: ["tech", "laptop"] });

    expect(screen.getByTestId("multi-selected-value")).toHaveTextContent(
      "Tech, Laptop"
    );
  });

  it("closes dropdown when clicking outside", () => {
    setup();

    fireEvent.click(screen.getByTestId("multi-select"));
    expect(screen.getByTestId("checkbox-input-tech")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByTestId("checkbox-input-tech")).not.toBeInTheDocument();
  });
});
