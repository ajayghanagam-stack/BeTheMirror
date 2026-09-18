import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = {
  id: string;
  name: string;
  type?: "text" | "email";
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  describedById?: string;
  invalid?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type" | "autoComplete" | "defaultValue" | "required" | "placeholder">;

export function TextField({
  id,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  required,
  placeholder,
  describedById,
  invalid,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      aria-describedby={describedById}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        "w-full rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        "px-3 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]",
        "placeholder:text-[color:var(--color-fg-muted)]",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-cyan)] focus:border-transparent",
        invalid && "border-red-400",
        className
      )}
      {...rest}
    />
  );
}
