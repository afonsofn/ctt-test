import "./Toast.css";

import React from "react";
import { ToastContainerProps } from "./Toast.types";

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
