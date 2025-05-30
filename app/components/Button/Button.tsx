import "./Button.css";

import { ButtonProps } from "./Button.types";
import React from "react";

const Button = ({
  variant = "primary",
  small = false,
  loading = false,
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) => {
  const classes = `btn ${variant} ${small ? "small" : ""} ${className}`.trim();

  return (
    <button className={classes} disabled={loading || rest.disabled} {...rest}>
      {loading ? (
        <span className="spinner" aria-label="Loading" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children && <span className="btn-text">{children}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
