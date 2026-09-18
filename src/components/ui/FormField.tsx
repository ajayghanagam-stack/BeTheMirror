import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ id, label, required, description, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[length:var(--text-body)] font-medium text-[color:var(--color-fg-primary)]">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[color:var(--color-accent-cyan)]">
            *
          </span>
        )}
      </label>
      {description && (
        <p className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">{description}</p>
      )}
      {children}
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-[length:var(--text-small)] text-red-400"
        >
          {error}
        </span>
      )}
    </div>
  );
}
