"use client";

import { X } from "lucide-react";
import { type ReactNode, useRef } from "react";

type ModalProps = {
  title: string;
  description?: string;
  triggerLabel: ReactNode;
  triggerClassName?: string;
  children: ReactNode;
};

export function Modal({
  title,
  description,
  triggerLabel,
  triggerClassName,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className={triggerClassName ?? "bo-button"}
        onClick={() => dialogRef.current?.showModal()}
        type="button"
      >
        {triggerLabel}
      </button>

      <dialog
        className="bo-modal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
        ref={dialogRef}
      >
        <div className="bo-modal-inner" onClick={(event) => event.stopPropagation()}>
          <div className="bo-modal-head">
            <div>
              <h2>{title}</h2>
              {description ? <p className="bo-muted">{description}</p> : null}
            </div>
            <form method="dialog">
              <button aria-label="Fermer" className="bo-icon-button" type="submit">
                <X aria-hidden="true" size={18} />
              </button>
            </form>
          </div>
          <div className="bo-modal-body">{children}</div>
        </div>
      </dialog>
    </>
  );
}
