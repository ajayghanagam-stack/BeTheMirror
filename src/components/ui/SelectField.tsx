import type React from "react";
import { cn } from "@/lib/cn";

type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  id: string;
  name: string;
  options: readonly SelectOption[];
  defaultValue?: string;
  required?: boolean;
  describedById?: string;
  invalid?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export function SelectField({
  id,
  name,
  options,
  defaultValue,
  required,
  describedById,
  invalid,
  className,
  onChange,
}: SelectFieldProps) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue}
      required={required}
      aria-describedby={describedById}
      aria-invalid={invalid ? true : undefined}
      onChange={onChange}
      className={cn(
        "w-full rounded-md border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        "px-3 py-2 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-cyan)] focus:border-transparent",
        invalid && "border-red-400",
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
