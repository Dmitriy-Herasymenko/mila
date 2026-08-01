"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const CONTACT_EMAIL = "hello@milapatramanska.com";

export function Contact() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const budgetOptions = tf.raw("budgetOptions") as string[];
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      budget: form.get("budget"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="section-gap relative overflow-hidden"
      style={{ backgroundColor: "var(--color-paper-white)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-[320px] w-[320px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(10,132,255,0.18) 0%, rgba(10,132,255,0) 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-[360px] w-[360px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(163,163,163,0.3) 0%, rgba(163,163,163,0) 70%)" }}
      />

      <div className="container-page relative grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <h2
              className="font-display text-[32px] md:text-[42px]"
              style={{ color: "var(--color-ink-black)" }}
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-sm text-[17px]" style={{ color: "var(--color-ink-black)" }}>
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <div className="text-[14px]" style={{ color: "var(--color-ash-gray)" }}>
                {t("directLabel")}
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-display mt-1 inline-block text-[20px]"
                style={{ color: "var(--color-ink-black)" }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="glass-card grid grid-cols-1 gap-5 p-[24px] sm:grid-cols-2 md:p-[32px]"
          >
            <label className="flex flex-col gap-2 text-[14px] sm:col-span-1">
              <span style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>{tf("name")}</span>
              <input
                required
                name="name"
                placeholder={tf("namePlaceholder")}
                className="glass-input px-[12px] py-[10px] text-[16px]"
              />
            </label>

            <label className="flex flex-col gap-2 text-[14px] sm:col-span-1">
              <span style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>{tf("email")}</span>
              <input
                required
                type="email"
                name="email"
                placeholder={tf("emailPlaceholder")}
                className="glass-input px-[12px] py-[10px] text-[16px]"
              />
            </label>

            <label className="flex flex-col gap-2 text-[14px] sm:col-span-2">
              <span style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>{tf("budget")}</span>
              <select
                name="budget"
                defaultValue=""
                className="glass-input px-[12px] py-[10px] text-[16px]"
              >
                <option value="" disabled>
                  {tf("budgetPlaceholder")}
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-[14px] sm:col-span-2">
              <span style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>{tf("message")}</span>
              <textarea
                required
                name="message"
                rows={5}
                placeholder={tf("messagePlaceholder")}
                className="glass-input resize-none px-[12px] py-[10px] text-[16px]"
              />
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full sm:w-auto"
              >
                {status === "submitting" ? tf("submitting") : tf("submit")}
              </button>
            </div>

            <div className="sm:col-span-2">
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[14px]"
                    style={{ color: "var(--color-ink-black)", fontWeight: 500 }}
                  >
                    {tf("success")}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[14px]"
                    style={{ color: "var(--color-ink-black)", fontWeight: 500 }}
                  >
                    {tf("error")}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
