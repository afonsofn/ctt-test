import "./MultiSelect.css";

import React, { useEffect, useRef, useState } from "react";

import { MultiSelectProps } from "./MultiSelect.types";

const MultiSelect = ({
  options,
  selected,
  onChange,
  label,
  placeholder = "Select options...",
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayText = selected.length ? (
    <span data-testid="multi-selected-value" className="selected-value">
      {options
        .filter((opt) => selected.includes(opt.id))
        .map((opt) => opt.label)
        .join(", ")}
    </span>
  ) : (
    <span data-testid="multi-select-placeholder" className="placeholder">
      {placeholder}
    </span>
  );

  return (
    <div className="form-group" ref={ref}>
      {label && <label>{label}</label>}

      <div className="multi-select">
        <div
          data-testid="multi-select"
          className="multi-select-display"
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayText}
        </div>

        {isOpen && (
          <div className="multi-select-options">
            {options.map((opt) => (
              <label key={opt.id} className="multi-select-option">
                <input
                  type="checkbox"
                  data-testid={`checkbox-input-${opt.id}`}
                  checked={selected.includes(opt.id)}
                  onChange={() => toggleOption(opt.id)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
