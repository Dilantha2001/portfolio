// src/components/resume/Resume.tsx
import React from "react";
import { Icon } from "@iconify/react";
import { PORTFOLIO_INFO } from "../../config/portfolioData";
import type { DateRange, Portfolio } from "../../types/portfolio";

export const Resume: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const resumeInfo: Portfolio = PORTFOLIO_INFO;

  const personal = resumeInfo.personal ?? {
    name: "Your Name",
    title: "",
    headline: "",
    avatar: undefined,
    summary: "",
    contact: undefined,
  };

  const contact = personal.contact ?? {};
  const meta = resumeInfo.meta ?? {};

  function formatDate(date?: string | DateRange): string {
    if (!date) return "";
    if (typeof date === "string") return date;

    const start = date.start ?? "";
    if (date.present) return `${start} — Present`;
    if (date.end) return `${start} — ${date.end}`;
    return start;
  }

  // Dynamic Skill Icon Resolver
  const getSkillIcon = (_iconName: string, skillName: string): string => {
    const lowerName = skillName.toLowerCase();
    if (lowerName.includes("react")) return "simple-icons:react";
    if (lowerName.includes("typescript")) return "simple-icons:typescript";
    if (lowerName.includes("javascript")) return "simple-icons:javascript";
    if (lowerName.includes("html")) return "simple-icons:html5";
    if (lowerName.includes("css")) return "simple-icons:css3";
    if (lowerName.includes("tailwind")) return "simple-icons:tailwindcss";
    if (lowerName.includes("material")) return "simple-icons:mui";
    if (lowerName.includes("php")) return "simple-icons:php";
    if (lowerName.includes("node")) return "simple-icons:nodedotjs";
    if (lowerName.includes("express")) return "simple-icons:express";
    if (lowerName.includes("java")) return "simple-icons:java";
    if (lowerName.includes("aws")) return "simple-icons:amazonwebservices";
    if (lowerName.includes("docker")) return "simple-icons:docker";
    if (lowerName.includes("postgres")) return "simple-icons:postgresql";
    if (lowerName.includes("mysql")) return "simple-icons:mysql";
    if (lowerName.includes("mongodb")) return "simple-icons:mongodb";
    if (lowerName.includes("git")) return "simple-icons:git";
    if (lowerName.includes("github")) return "simple-icons:github";
    if (lowerName.includes("jira")) return "simple-icons:jira";
    if (lowerName.includes("vs code")) return "simple-icons:visualstudiocode";
    return "lucide:terminal";
  };

  // Social Icon Helper
  const getSocialIcon = (label: string): string => {
    const lower = label.toLowerCase();
    if (lower.includes("linkedin")) return "simple-icons:linkedin";
    if (lower.includes("github")) return "simple-icons:github";
    if (lower.includes("twitter") || lower.includes("x")) return "simple-icons:x";
    return "lucide:globe";
  };
  return (
    <article
      className={`w-full max-w-[1400px] mx-auto print:bg-white print:text-black print:p-0 print:max-w-none transition-all duration-300 ${className}`}
      aria-label="Interactive visual resume"
      id="resume-print-area"
    >
      {/* ── HEADER PROFILE BAR ── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent print:text-slate-900 print:bg-none print:text-3xl">
            {personal.name}
          </h1>
          {personal.title && (
            <p className="text-base font-semibold tracking-wide text-purple-400 uppercase font-mono print:text-slate-700 print:text-sm">
              {personal.title}
            </p>
          )}
          {personal.headline && (
            <div className="flex flex-wrap gap-2 mt-1 print:mt-0">
              {personal.headline.split("·").map((h, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-mono print:bg-transparent print:border-none print:text-slate-600 print:p-0 print:after:content-['•'] last:print:after:content-none print:after:mx-1.5"
                >
                  {h.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-400 font-medium print:text-slate-700 print:grid-cols-1 print:gap-1">
          {contact.email && (
            <div className="flex items-center gap-2 group">
              <Icon icon="lucide:mail" className="text-purple-400 shrink-0 text-sm print:text-slate-700" />
              <a href={`mailto:${contact.email}`} className="hover:text-purple-400 transition underline decoration-slate-800 print:text-slate-900 print:no-underline">
                {contact.email}
              </a>
            </div>
          )}

          {contact.phone && (
            <div className="flex items-center gap-2">
              <Icon icon="lucide:phone" className="text-purple-400 shrink-0 text-sm print:text-slate-700" />
              <span className="print:text-slate-900">{contact.phone}</span>
            </div>
          )}

          {contact.website && (
            <div className="flex items-center gap-2 group">
              <Icon icon="lucide:globe" className="text-purple-400 shrink-0 text-sm print:text-slate-700" />
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition underline decoration-slate-800 print:text-slate-900 print:no-underline"
              >
                {contact.website.replace(/(^\w+:|^)\/\//, "")}
              </a>
            </div>
          )}

          {contact.location && (
            <div className="flex items-center gap-2">
              <Icon icon="lucide:map-pin" className="text-purple-400 shrink-0 text-sm print:text-slate-700" />
              <span className="capitalize print:text-slate-900">{contact.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN DASHBOARD GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:grid-cols-1 print:gap-4">
        
        {/* ── LEFT COLUMN (Sidebar info) ── */}
        <div className="lg:col-span-1 flex flex-col gap-6 print:gap-4">
          
          {/* Social Links Card */}
          {contact.socials && contact.socials.length > 0 && (
            <div className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:share-2" className="text-purple-400 print:text-slate-900" /> Professional Channels
              </h2>
              <div className="flex flex-col gap-2.5">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950/40 border border-slate-900 hover:border-purple-500/30 hover:bg-purple-500/5 transition duration-300 group print:bg-transparent print:border-none print:p-0"
                  >
                    <Icon
                      icon={getSocialIcon(s.label)}
                      className="text-base text-slate-400 group-hover:text-purple-400 transition print:text-slate-900"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-300 group-hover:text-white transition print:text-slate-900">{s.label}</div>
                      <div className="text-xs text-slate-500 truncate group-hover:text-slate-400 transition print:text-slate-600">
                        {s.url.replace(/(^\w+:|^)\/\//, "")}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Education Card */}
          {resumeInfo.education && resumeInfo.education.length > 0 && (
            <div className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:graduation-cap" className="text-purple-400 print:text-slate-900" /> Education
              </h2>
              <div className="flex flex-col gap-4">
                {resumeInfo.education.map((ed, idx) => (
                  <div key={idx} className="relative pl-5 border-l-2 border-slate-800/80 last:border-l-transparent pb-1 last:pb-0 print:border-slate-300">
                    {/* Tiny node */}
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)] print:bg-slate-900 print:shadow-none" />
                    <h3 className="text-sm font-bold text-slate-200 print:text-slate-900">
                      {ed.degree}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 print:text-slate-700">
                      {ed.school}
                    </p>
                    <span className="text-xs font-mono text-purple-400/80 block mt-1 print:text-slate-600">
                      {formatDate(ed.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Card */}
          {resumeInfo.certifications && resumeInfo.certifications.length > 0 && (
            <div className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:award" className="text-purple-400 print:text-slate-900" /> Certifications
              </h2>
              <div className="flex flex-col gap-3">
                {resumeInfo.certifications.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start p-2.5 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-purple-500/20 transition duration-300 print:bg-transparent print:border-none print:p-0 print:gap-1"
                  >
                    <Icon icon="lucide:check-circle" className="text-sm text-purple-400 shrink-0 mt-0.5 print:text-slate-700" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 leading-snug print:text-slate-900">
                        {c.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium print:text-slate-600">
                        <span>{c.issuer}</span>
                        <span>•</span>
                        <span>{typeof c.date === "string" ? c.date : c.date?.start ?? c.date?.end ?? ""}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages & Interests Card */}
          {resumeInfo.extras && (
            <div className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:user" className="text-purple-400 print:text-slate-900" /> Extras
              </h2>
              <div className="space-y-4">
                {resumeInfo.extras.languages && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 print:text-slate-700">Languages</h3>
                    <div className="flex flex-col gap-1.5">
                      {resumeInfo.extras.languages.map((lang) => (
                        <div key={lang.name} className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-200 print:text-slate-900">{lang.name}</span>
                          <span className="text-xs text-slate-500 font-medium print:text-slate-600">{lang.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {resumeInfo.extras.interests && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 print:text-slate-700">Interests</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {resumeInfo.extras.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-850 text-xs text-slate-400 print:bg-transparent print:border-none print:text-slate-800 print:p-0 print:after:content-[','] last:print:after:content-none print:after:mr-1"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ── RIGHT COLUMNS (Main info & Timeline) ── */}
        <div className="lg:col-span-2 flex flex-col gap-6 print:gap-4">
          
          {/* Summary Box */}
          {personal.summary && (
            <section className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:file-text" className="text-purple-400 print:text-slate-900" /> Profile Summary
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed text-justify print:text-slate-800">
                {personal.summary}
              </p>
            </section>
          )}

          {/* Highlights Box */}
          {resumeInfo.highlights && resumeInfo.highlights.length > 0 && (
            <section className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:sparkles" className="text-purple-400 print:text-slate-900" /> Career Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300 print:grid-cols-1 print:gap-1 print:text-slate-800">
                {resumeInfo.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <Icon icon="lucide:check" className="text-purple-400 shrink-0 text-sm mt-0.5 print:text-slate-700" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills Breakdown Grid */}
          {resumeInfo.skills && resumeInfo.skills.length > 0 && (
            <section className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:cpu" className="text-purple-400 print:text-slate-900" /> Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-1 print:gap-2">
                {resumeInfo.skills.map((group, gi) => (
                  <div
                    key={gi}
                    className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 transition duration-300 print:bg-transparent print:border-none print:p-0"
                  >
                    <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3 font-mono print:text-slate-900 print:mb-1">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((s) => (
                        <div
                          key={s.name}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-purple-500/20 hover:bg-purple-500/5 transition duration-300 text-sm font-medium text-slate-200 print:bg-transparent print:border-none print:text-slate-900 print:p-0 print:after:content-[','] last:print:after:content-none print:after:mr-1"
                        >
                          <Icon icon={getSkillIcon(s.icon ?? "", s.name)} className="text-sm text-purple-400 shrink-0 print:hidden" />
                          <span>{s.name}</span>
                          {s.years ? (
                            <span className="text-xs text-slate-500 font-mono print:text-slate-600">
                              ({s.years}y)
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience Timeline */}
          {resumeInfo.experience && resumeInfo.experience.length > 0 && (
            <section className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-5 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:briefcase" className="text-purple-400 print:text-slate-900" /> Work Experience
              </h2>
              <div className="space-y-6">
                {resumeInfo.experience.map((exp, idx) => (
                  <div
                    key={exp.id ?? `${exp.title}-${idx}`}
                    className="relative pl-6 border-l-2 border-slate-800/80 last:border-l-transparent pb-4 last:pb-0 group/exp print:border-slate-300 print:pb-2"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#020617] border-2 border-purple-500 group-hover/exp:bg-purple-500 group-hover/exp:scale-110 transition duration-300 shadow-[0_0_8px_rgba(168,85,247,0.3)] print:bg-slate-900 print:border-slate-900 print:shadow-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <h3 className="text-base font-bold text-slate-100 group-hover/exp:text-purple-400 transition print:text-slate-900">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-300 mt-0.5 print:text-slate-700">
                          {exp.company}
                          {exp.location && (
                            <span className="text-slate-500 font-normal"> • {exp.location}</span>
                          )}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-purple-400/80 mt-1 sm:mt-0 px-2 py-0.5 rounded bg-slate-950/60 border border-slate-900 print:bg-transparent print:border-none print:text-slate-600 print:p-0">
                        {formatDate(exp.date)}
                      </span>
                    </div>

                    {exp.summary && (
                      <p className="mt-2.5 text-sm text-slate-400 leading-relaxed text-justify print:text-slate-800">
                        {exp.summary}
                      </p>
                    )}

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside mt-3 ml-4 space-y-1.5 text-sm text-slate-400 leading-normal print:text-slate-800 print:mt-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="pl-1">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.tech && exp.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 items-center print:mt-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mr-1 print:text-slate-600">Stack:</span>
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-950/60 border border-slate-900 text-xs text-slate-400 font-mono print:bg-transparent print:border-none print:text-slate-800 print:p-0 print:after:content-[','] last:print:after:content-none print:after:mr-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Selected Projects */}
          {resumeInfo.projects && resumeInfo.projects.length > 0 && (
            <section className="bg-[#020617]/40 backdrop-blur-xl border border-slate-800/60 p-5 rounded-2xl print:bg-transparent print:border-none print:p-0">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-5 flex items-center gap-2 print:text-slate-900">
                <Icon icon="lucide:folder-git-2" className="text-purple-400 print:text-slate-900" /> Selected Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-1 print:gap-3">
                {resumeInfo.projects.slice(0, 4).map((p) => (
                  <div
                    key={p.id ?? p.title}
                    className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-purple-500/30 hover:bg-purple-500/5 transition duration-300 flex flex-col justify-between group/project print:bg-transparent print:border-none print:p-0"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover/project:text-purple-400 transition print:text-slate-900">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="mt-2 text-xs text-slate-400 leading-relaxed text-justify print:text-slate-800 print:mt-0.5">
                          {p.description}
                        </p>
                      )}
                    </div>
                    {p.tags && p.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1 print:mt-1">
                        {p.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-slate-900/60 border border-slate-850 text-[10px] text-slate-400 font-mono print:bg-transparent print:border-none print:text-slate-800 print:p-0 print:after:content-[','] last:print:after:content-none print:after:mr-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>

      {/* ── FOOTER BAR ── */}
      <footer className="mt-8 pt-6 border-t border-slate-800/60 text-[10px] text-slate-500 font-medium flex flex-col sm:flex-row justify-between items-center gap-4 print:border-slate-300 print:text-slate-600 print:mt-4 print:pt-2">
        <div>
          © {new Date().getFullYear()} {personal.name} • Software Portfolio CV
        </div>
        <div className="flex items-center gap-3 print:hidden">
          <a
            href={meta.pdf ?? "/resume.pdf"}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400 transition underline decoration-slate-800"
            download
          >
            <Icon icon="lucide:download" className="text-xs" /> Download PDF Version
          </a>
        </div>
      </footer>
    </article>
  );
};

export default Resume;
