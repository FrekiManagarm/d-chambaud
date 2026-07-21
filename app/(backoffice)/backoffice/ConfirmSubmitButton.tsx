"use client";

import type { ComponentProps } from "react";

type ConfirmSubmitButtonProps = ComponentProps<"button"> & {
  confirmation: string;
};

export function ConfirmSubmitButton({
  confirmation,
  onClick,
  ...props
}: ConfirmSubmitButtonProps) {
  return (
    <button
      {...props}
      onClick={(event) => {
        if (!window.confirm(confirmation)) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
    />
  );
}
