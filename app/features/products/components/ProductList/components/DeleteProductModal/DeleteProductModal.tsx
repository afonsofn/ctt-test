import "./DeleteProductModal.css";

import Button from "@/components/Button/Button";
import { DeleteProductModalProps } from "./DeleteProductModal.types";
import Modal from "@/components/Modal/Modal";
import React from "react";

const DeleteProductModal = ({
  openModal,
  onConfirm,
  onCancel,
  loading,
}: DeleteProductModalProps) => {
  if (!openModal) return null;

  return (
    <Modal openModal={openModal} closeModal={onCancel}>
      <div className="delete-modal">
        <h3 data-testid="delete-modal-title">
          Are you sure you want to delete this product?
        </h3>

        <div className="buttons-wrapper">
          <Button
            data-testid="delete-modal-cancel-button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            data-testid="delete-modal-confirm-button"
            onClick={onConfirm}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
