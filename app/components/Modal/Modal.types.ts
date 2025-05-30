import { ReactNode } from "react";

export interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}
