// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center  cursor-pointer justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants: Record<typeof variant, string> = {
    primary:
      "text-white bg-primary hover:bg-primary/90 focus-visible:ring-primary-200",
    ghost:
      "text-gray-900 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-200",
  };

  return (
    <button className={clsx(baseClasses, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
