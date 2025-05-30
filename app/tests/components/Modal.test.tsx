import { render, screen } from "@testing-library/react";

import Modal from "@/components/Modal/Modal";
import React from "react";

describe("Modal", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it("should call showModal when openModal is true", () => {
    render(
      <Modal openModal={true} closeModal={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call close when openModal is false", () => {
    render(
      <Modal openModal={false} closeModal={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  it("should call closeModal when onCancel is triggered", () => {
    const closeModalMock = jest.fn();

    render(
      <Modal openModal={true} closeModal={closeModalMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const dialog = screen.getByTestId("main-modal");
    const event = new Event("cancel", { bubbles: true, cancelable: true });
    dialog.dispatchEvent(event);

    expect(closeModalMock).toHaveBeenCalled();
  });
});
