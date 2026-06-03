// src/components/ContactForm.tsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { PORTFOLIO_INFO } from "../config/portfolioData";

type ContactState = { name: string; email: string; message: string };

export const ContactForm: React.FC<{
  sendTo?: string; // recipient email address (optional; fallback to VITE_CONTACT_EMAIL)
}> = ({ sendTo }) => {
  const [state, setState] = useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Pick recipient from prop or from Vite env (if available)
  const DEFAULT_TO = sendTo ?? import.meta.env.VITE_CONTACT_EMAIL ?? "pramudithadilantha89@gmail.com";

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setErrorMsg(null);

    // Require a recipient address somewhere (either env or passed prop)
    if (!DEFAULT_TO) {
      setErrorMsg("Recipient address not configured. Contact admin to enable messaging.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE", // standard Web3Forms integration or custom mail url
      to: DEFAULT_TO,
      subject: `Website Contact from ${state.name || state.email}`,
      from_name: state.name || "Portfolio Contact",
      message: `${state.message}\n\n---\nReply to: ${state.name} <${state.email}>`,
    };

    try {
      // Direct Web3Forms submission or fall back to native custom mailing endpoint
      const isCustomApi = import.meta.env.VITE_MAIL_API_URL;
      const targetUrl = isCustomApi ? `${import.meta.env.VITE_MAIL_API_URL}/send` : "https://api.web3forms.com/submit";
      const bodyPayload = isCustomApi 
        ? {
            to: DEFAULT_TO,
            subject: payload.subject,
            body: payload.message,
            html: false,
            from_name: state.name || undefined,
            from_email: state.email || undefined,
          }
        : payload;

      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Server returned ${res.status}`);
      }

      setSuccess(true);
      setState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to send contact message", err);
      setSuccess(false);
      setErrorMsg((err as Error).message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full select-none" aria-live="polite">
      {/* 2-Column Row for Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
            <Icon icon="lucide:user" className="text-xs text-purple-400" />
            <span>Full Name</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. John Doe"
            value={state.name}
            onChange={update}
            required
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/40 border border-white/5 focus:border-purple-500/70 focus:bg-slate-950/80 focus:ring-4 focus:ring-purple-500/10 text-slate-200 placeholder-slate-600 text-xs sm:text-sm font-light transition-all duration-300 outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
            <Icon icon="lucide:mail" className="text-xs text-purple-400" />
            <span>Email Address</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. johndoe@example.com"
            value={state.email}
            onChange={update}
            required
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/40 border border-white/5 focus:border-purple-500/70 focus:bg-slate-950/80 focus:ring-4 focus:ring-purple-500/10 text-slate-200 placeholder-slate-600 text-xs sm:text-sm font-light transition-all duration-300 outline-none"
          />
        </div>
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
          <Icon icon="lucide:message-square" className="text-xs text-purple-400" />
          <span>Your Message</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, idea or question..."
          value={state.message}
          onChange={update}
          rows={5}
          required
          className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/40 border border-white/5 focus:border-purple-500/70 focus:bg-slate-950/80 focus:ring-4 focus:ring-purple-500/10 text-slate-200 placeholder-slate-600 text-xs sm:text-sm font-light transition-all duration-300 outline-none resize-none"
        />
      </div>

      {/* Action Submit */}
      <div className="pt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-xs tracking-widest uppercase shadow-[0_4px_25px_-4px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 btn-light-flare"
        >
          {loading ? (
            <>
              <Icon icon="lucide:loader-2" className="text-base animate-spin" />
              <span>Transmitting Message...</span>
            </>
          ) : (
            <>
              <Icon icon="lucide:send" className="text-base" />
              <span>Send Message</span>
            </>
          )}
        </button>

        {/* Action Alerts */}
        {success === true && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-semibold animate-pulse">
            <Icon icon="lucide:check-circle" className="text-sm shrink-0" />
            <span>Message sent successfully! Thank you for connecting.</span>
          </div>
        )}
        {success === false && (
          <div className="flex flex-col gap-1 px-4 py-3 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:alert-circle" className="text-sm shrink-0" />
              <span>Submission failed.</span>
            </div>
            {errorMsg && (
              <span className="block text-[10px] text-red-400/80 font-mono mt-0.5 leading-normal">
                Detail: {errorMsg}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Decorative divider */}
      <div className="mt-4 border-t border-white/5" />

      {/* Modern Contact Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400 pt-2">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href={`mailto:${PORTFOLIO_INFO.personal.contact?.email}`}
            className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
          >
            <Icon icon="lucide:mail" className="text-purple-400 text-sm" />
            <span>{PORTFOLIO_INFO.personal.contact?.email}</span>
          </a>
          {PORTFOLIO_INFO.personal.contact?.location && (
            <div className="flex items-center gap-2 text-slate-400">
              <Icon icon="lucide:map-pin" className="text-purple-400 text-sm" />
              <span className="capitalize">{PORTFOLIO_INFO.personal.contact.location}</span>
            </div>
          )}
        </div>

        {/* Social sockets */}
        <div className="flex items-center gap-3">
          {PORTFOLIO_INFO.personal?.contact?.socials?.map((s) => {
            const iconMap: Record<string, string> = {
              SiLinkedin: "simple-icons:linkedin",
              SiGithub: "simple-icons:github",
              LinkedIn: "simple-icons:linkedin",
              GitHub: "simple-icons:github",
            };
            const iconName = (s.icon ? iconMap[s.icon] : undefined) || iconMap[s.label] || "lucide:globe";
            return (
              <a
                key={s.label}
                href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/5 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                title={s.label}
              >
                <Icon icon={iconName} className="text-sm" />
              </a>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
