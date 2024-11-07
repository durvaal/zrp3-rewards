"use client";

import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, className, appName, onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick || (() => alert(`Hello from your ${appName} app!`))}
    >
      {children}
    </button>
  );
};
