"use client";
// src/components/site/contact/InquiryForm.tsx

import { useActionState, useState } from "react";
import { submitEnquiryAction } from "@/app/actions/submit-enquiry";
import type { SubmitResult } from "@/app/actions/submit-enquiry";
import type { EnquiryType } from "@/lib/enquiry";
import { ENQUIRY_TYPES, ENQUIRY_TYPE_LABELS, LOCATION_FORMAT_LABELS } from "@/lib/enquiry";
import { FormField } from "@/components/ui/FormField";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { SelectField } from "@/components/ui/SelectField";
import { FormMessage } from "@/components/ui/FormMessage";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Button } from "@/components/ui/Button";

type InquiryFormProps = {
  defaultEnquiryType?: EnquiryType;
};

const enquiryTypeOptions = ENQUIRY_TYPES.map((t) => ({
  value: t,
  label: ENQUIRY_TYPE_LABELS[t],
}));

const locationOptions = (
  Object.entries(LOCATION_FORMAT_LABELS) as [string, string][]
).map(([value, label]) => ({ value, label }));

const speakingEnquiryTypes: readonly EnquiryType[] = ["speaking", "workshop"];

export function InquiryForm({ defaultEnquiryType = "general" }: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState<SubmitResult | null, FormData>(
    submitEnquiryAction,
    null
  );
  const [selectedType, setSelectedType] = useState<EnquiryType>(defaultEnquiryType);

  const errors = state?.ok === false ? state.errors : {};
  const showSpeakingExtras = speakingEnquiryTypes.includes(selectedType);

  if (state?.ok === true) {
    return <FormSuccess delivered={state.delivered} reason={state.reason} />;
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {state?.ok === false && (
        <FormMessage variant="error">
          There was a problem with your submission. Please review the fields below.
        </FormMessage>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name}>
          <TextField
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            describedById={errors.name ? "name-error" : undefined}
            invalid={!!errors.name}
          />
        </FormField>

        <FormField id="email" label="Email" required error={errors.email}>
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            describedById={errors.email ? "email-error" : undefined}
            invalid={!!errors.email}
          />
        </FormField>

        <FormField id="organization" label="Organization" error={errors.organization}>
          <TextField
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Your organization (optional)"
          />
        </FormField>

        <FormField id="role" label="Role / Title" error={errors.role}>
          <TextField
            id="role"
            name="role"
            type="text"
            autoComplete="off"
            placeholder="Your role or title (optional)"
          />
        </FormField>
      </div>

      <FormField id="enquiryType" label="Inquiry Type" required error={errors.enquiryType}>
        <SelectField
          id="enquiryType"
          name="enquiryType"
          options={enquiryTypeOptions}
          defaultValue={defaultEnquiryType}
          required
          onChange={(e) => setSelectedType(e.target.value as EnquiryType)}
        />
      </FormField>

      {showSpeakingExtras && (
        <div className="grid gap-6 md:grid-cols-2 border border-[color:var(--color-border-subtle)] rounded-lg p-4">
          <p className="col-span-full text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
            Speaking &amp; Workshop details (optional)
          </p>

          <FormField id="event" label="Event or Organization">
            <TextField id="event" name="event" type="text" placeholder="Event name or organizing body" />
          </FormField>

          <FormField id="preferredDate" label="Preferred Date">
            <TextField id="preferredDate" name="preferredDate" type="text" placeholder="e.g. Q1 2027 or March 2027" />
          </FormField>

          <FormField id="location" label="Location Format">
            <SelectField
              id="location"
              name="location"
              options={[{ value: "", label: "— select —" }, ...locationOptions]}
            />
          </FormField>

          <FormField id="audienceSize" label="Expected Audience Size">
            <TextField id="audienceSize" name="audienceSize" type="text" placeholder="e.g. 50, 200, unsure" />
          </FormField>
        </div>
      )}

      <FormField id="message" label="Message" required error={errors.message}>
        <TextArea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your inquiry..."
          describedById={errors.message ? "message-error" : undefined}
          invalid={!!errors.message}
        />
      </FormField>

      <div className="flex flex-col gap-3">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Sending\u2026" : "Send Message"}
        </Button>
        <p className="text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
          We will use the information you provide only to respond to your inquiry.
        </p>
      </div>
    </form>
  );
}
