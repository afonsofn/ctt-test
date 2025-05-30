import "./Modal.css";

import React, { useEffect, useRef } from "react";

import { ModalProps } from "./Modal.types";

const Modal = ({ openModal, closeModal, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      return;
    }
    ref.current?.close();
  }, [openModal]);

  return (
    <dialog data-testid="main-modal" ref={ref} onCancel={closeModal}>
      {children}
    </dialog>
  );
};

export default Modal;
