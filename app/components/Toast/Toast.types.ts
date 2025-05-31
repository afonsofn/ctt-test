export interface ToastContainerProps {
  toasts: Toast[];
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export type ToastType = "success" | "error";

export interface ToastProviderProps {
  children: React.ReactNode;
}
