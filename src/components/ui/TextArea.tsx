import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextAreaProps = {
  id: string;
  name: string;
  rows?: number;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  describedById?: string;
  invalid?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name" | "rows" | "autoComplete" | "defaultValue" | "required" | "placeholder">;

export function TextArea({
  id,
  name,
  rows = 5,
  autoComplete,
  defaultValue,
  required,
  placeholder,
  describedById,
  invalid,
  className,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      aria-describedby={describedById}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        "w-full rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        "px-3 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]",
        "placeholder:text-[color:var(--color-fg-muted)] resize-y",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-cyan)] focus:border-transparent",
        invalid && "border-red-400",
        className
      )}
      {...rest}
    />
  );
}
