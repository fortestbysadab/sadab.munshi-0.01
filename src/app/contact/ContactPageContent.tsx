"use client";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "./ContactForm";

export default function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="container-page pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <PageHeader title={t.contact.title} description={t.contact.subtitle} />

        <Reveal className="mt-12">
          <div className="shell">
            <div className="panel p-5 sm:p-7 md:p-10">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
