import { Button } from "@/components/ui/Button";

type FormSuccessProps = {
  delivered: boolean;
  reason?: string;
};

export function FormSuccess({ delivered }: FormSuccessProps) {
  const navLinks = (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button href="/" variant="secondary">Home</Button>
      <Button href="/book" variant="secondary">Explore the Book</Button>
      <Button href="/ideas" variant="secondary">Ideas</Button>
    </div>
  );

  if (delivered) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-primary)]">
          Thank you. Your message has been received. We appreciate you reaching out to Be the Mirror.
        </p>
        {navLinks}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-primary)]">
        Thank you. Your message was received for now, but email delivery is not yet configured for this site.
      </p>
      <p className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)]">
        If you were expecting an email response, please try again after configuration is complete.
      </p>
      {navLinks}
    </div>
  );
}
