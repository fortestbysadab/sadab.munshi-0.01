"use client";

import { useState } from "react";
import { CheckCircle, EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback(t.contact.errorFill);
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setFeedback(json.message);
        form.reset();
      } else {
        setStatus("error");
        setFeedback(json.message || t.contact.errorGeneric);
      }
    } catch {
      setStatus("error");
      setFeedback(t.contact.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={44} weight="light" className="text-terracotta-deep" />
        <p className="font-serif text-display-sm text-forest">
          {t.contact.successTitle}
        </p>
        <p className="max-w-prose text-body-md text-forest-soft">{feedback}</p>
      </div>
    );
  }

  return (
    <>
      {status === "error" && feedback && (
        <div className="mb-6 rounded-lg border border-error/30 bg-error-soft px-5 py-3.5 text-body-sm text-error-deep">
          {feedback}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-body-sm font-semibold text-forest">
            {t.contact.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={t.contact.namePlaceholder}
            required
            className="field h-14"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-body-sm font-semibold text-forest">
            {t.contact.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t.contact.emailPlaceholder}
            required
            className="field h-14"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-body-sm font-semibold text-forest">
            {t.contact.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            placeholder={t.contact.messagePlaceholder}
            required
            rows={6}
            className="field resize-y py-4"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary mt-2 h-14 w-full justify-between pl-6 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "submitting" ? t.contact.sending : t.contact.send}
          <span className="btn-ico" aria-hidden>
            <PaperPlaneTilt size={16} weight="bold" />
          </span>
        </button>
      </form>

      <div className="my-8 flex items-center gap-4 font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
        <span className="h-px flex-1 bg-stone" />
        <span>{t.contact.orLabel}</span>
        <span className="h-px flex-1 bg-stone" />
      </div>

      <div className="flex justify-center">
        <a
          href={`mailto:${site.email}`}
          className="link-quiet"
          aria-label={t.contact.emailDirect}
        >
          <EnvelopeSimple size={16} weight="regular" aria-hidden />
          {t.contact.emailDirect}
        </a>
      </div>
    </>
  );
}
