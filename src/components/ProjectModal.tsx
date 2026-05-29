// src/components/ProjectModal.tsx
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import remarkGfm from "remark-gfm";
import type { Project } from "../types/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "./shared/Spinner";

const ReactMarkdown = React.lazy(() => import("react-markdown"));

export const ProjectModal: React.FC<{
  project: Project | null;
  open: boolean;
  onClose: () => void;
}> = ({ project, open, onClose }) => {
  const [readme, setReadme] = useState<string | null>(null);
  const [iframeAllowed, setIframeAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "playground">(
    "details"
  );
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setActiveTab("details");
      setIframeLoaded(false);
      setIframeReady(false);
    }
  }, [open]);

  // Check if href can be embedded in iframe
  useEffect(() => {
    if (!project?.href) {
      setIframeAllowed(false);
      return;
    }
    if (
      project.href.includes("github.io") ||
      project.href.includes("vercel.app") ||
      project.href.includes("netlify.app")
    ) {
      setIframeAllowed(true);
    } else {
      setIframeAllowed(false);
    }
  }, [project]);

  // Fetch GitHub README
  useEffect(() => {
    async function fetchReadme() {
      if (!project) return;
      const githubLink = project.links?.find((l) => l.label.toLowerCase() === "github");
      if (!githubLink) {
        setReadme(null);
        return;
      }

      try {
        const regex = /github\.com\/([^/]+)\/([^/]+)/;
        const match = regex.exec(githubLink.url);
        if (!match) return;

        const [, owner, repo] = match;
        const res = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
        );

        if (res.ok) {
          setReadme(await res.text());
        } else {
          setReadme(null);
        }
      } catch {
        setReadme(null);
      }
    }
    if (open) fetchReadme();
  }, [open, project]);

  // High-end technology tag highlighting helper
  const getTagClass = (tag: string): string => {
    const highlightTags = ["react", "typescript", "node.js", "full stack", "yolov8", "ai", "postgresql"];
    const lower = tag.toLowerCase();
    if (highlightTags.some(t => lower.includes(t))) {
      return "bg-purple-500/5 border border-purple-500/15 text-purple-400 text-[10px] font-mono tracking-tight";
    }
    return "bg-slate-900/40 border border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition duration-300 text-[10px] font-mono tracking-tight";
  };

  // Social Icon Helper
  const getLinkIcon = (iconName: string, label: string): string => {
    const lowerIcon = iconName.toLowerCase();
    const lowerLabel = label.toLowerCase();
    if (lowerIcon.includes("github") || lowerLabel.includes("github")) return "simple-icons:github";
    if (lowerIcon.includes("chrome") || lowerLabel.includes("demo") || lowerLabel.includes("live")) return "lucide:external-link";
    if (lowerIcon.includes("read") || lowerIcon.includes("doc") || lowerLabel.includes("paper")) return "lucide:file-text";
    return "lucide:link";
  };

  return (
    <AnimatePresence>
      {open && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          
          {/* Custom Portable Dark Markdown Styles */}
          <style>{`
            .custom-md-body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #cbd5e1;
            }
            .custom-md-body h1, .custom-md-body h2, .custom-md-body h3, .custom-md-body h4 {
              margin-top: 24px;
              margin-bottom: 16px;
              font-weight: 600;
              line-height: 1.25;
              color: #f8fafc;
              border-bottom: 1px solid #1e293b;
              padding-bottom: 0.3em;
            }
            .custom-md-body h1 { font-size: 1.4em; }
            .custom-md-body h2 { font-size: 1.25em; }
            .custom-md-body h3 { font-size: 1.1em; }
            .custom-md-body p { margin-top: 0; margin-bottom: 14px; font-size: 13px; font-weight: 300; }
            .custom-md-body ul, .custom-md-body ol { padding-left: 1.5em; margin-bottom: 14px; margin-top: 0; list-style-type: disc; }
            .custom-md-body li { font-size: 13px; font-weight: 300; margin-bottom: 4px; }
            .custom-md-body code {
              padding: 0.15em 0.35em;
              margin: 0;
              font-size: 85%;
              background-color: #0f172a;
              border-radius: 4px;
              font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace;
              color: #c084fc;
            }
            .custom-md-body pre {
              padding: 14px;
              overflow: auto;
              font-size: 85%;
              line-height: 1.45;
              background-color: #020617;
              border-radius: 8px;
              border: 1px solid #1e293b;
              margin-bottom: 14px;
            }
            .custom-md-body pre code {
              background-color: transparent;
              padding: 0;
              color: #e2e8f0;
            }
            .custom-md-body a {
              color: #818cf8;
              text-decoration: underline;
            }
            .custom-md-body blockquote {
              padding: 0 1em;
              color: #94a3b8;
              border-left: 0.25em solid #334155;
              margin: 0 0 14px 0;
            }
            .custom-md-body table {
              border-spacing: 0;
              border-collapse: collapse;
              margin-bottom: 14px;
              width: 100%;
              font-size: 12px;
            }
            .custom-md-body table th, .custom-md-body table td {
              padding: 6px 13px;
              border: 1px solid #1e293b;
            }
            .custom-md-body table tr {
              background-color: transparent;
              border-top: 1px solid #1e293b;
            }
            .custom-md-body table tr:nth-child(2n) {
              background-color: #0f172a/20;
            }
          `}</style>

          {/* Backdrop Blur overlay */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ── 80% WIDESCREEN DIALOG CONTAINER ── */}
          <motion.dialog
            open={open}
            aria-modal="true"
            className="relative z-10 w-[95vw] lg:w-[80vw] max-w-7xl h-[85vh] p-6 rounded-2xl bg-[#020617]/90 backdrop-blur-2xl border border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col text-slate-100 overflow-hidden"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            {/* ── MODAL HEADER ── */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/60 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
                  {project.title}
                </h3>
                {project.isUnderDevelopment && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                    Development
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Interactive Playground Switcher */}
                {iframeAllowed && (
                  <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-900 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab("details")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition ${
                        activeTab === "details"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("playground");
                        setIframeLoaded(true);
                        setIframeReady(false);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition ${
                        activeTab === "playground"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Playground
                    </button>
                  </div>
                )}

                {/* Modern Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition cursor-pointer"
                  aria-label="Close project panel"
                >
                  <Icon icon="lucide:x" className="text-base" />
                </button>
              </div>
            </div>

            {/* ── MODAL SCROLLABLE CONTENTS ── */}
            <div className="flex-1 overflow-y-auto pr-1 min-h-0 custom-scroll">
              <AnimatePresence mode="wait">
                {activeTab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="lg:grid lg:grid-cols-12 lg:gap-8 h-full flex flex-col gap-6"
                  >
                    {/* Left Panel: Cinema Showcase (cols 5) */}
                    <div className="lg:col-span-5 flex flex-col gap-5">
                      {project.image && (
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-900/80 bg-slate-950 shrink-0 shadow-lg">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Interactive Custom Pill Links */}
                      {(project.href || (project.links && project.links.length > 0)) && (
                        <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-950/40 border border-slate-900/80 shrink-0">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">Project Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {/* Live Demo Pill */}
                            {project.href && project.href !== "#" && (
                              <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition text-xs font-semibold text-white shadow-md shadow-purple-500/10 cursor-pointer w-full sm:w-auto"
                              >
                                <Icon icon="lucide:external-link" className="text-sm shrink-0" />
                                <span>Live Demo</span>
                              </a>
                            )}
                            {/* Dynamically Loaded Repo Links */}
                            {project.links?.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-850 hover:border-purple-500/30 hover:bg-purple-500/5 transition text-xs font-semibold text-slate-200 cursor-pointer w-full sm:w-auto"
                              >
                                <Icon icon={getLinkIcon(link.icon || "", link.label)} className="text-sm text-purple-400 shrink-0" />
                                <span>{link.label}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Unified Tech Capsules */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900/80 shrink-0">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Technologies Used</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((t) => (
                              <span key={t} className={`px-2.5 py-0.5 rounded-full ${getTagClass(t)}`}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Panel: Widescreen Documentation / README (cols 7) */}
                    <div className="lg:col-span-7 flex flex-col gap-4 min-h-0 h-full">
                      
                      {/* Project description box */}
                      <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900/80 leading-relaxed text-slate-300 text-sm md:text-base font-light font-sans text-justify shrink-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Project Overview</h4>
                        {project.description}
                      </div>

                      {/* GitHub README Viewer Terminal */}
                      {readme ? (
                        <div className="flex-1 min-h-[300px] overflow-hidden rounded-xl border border-slate-900/80 bg-slate-950/40 flex flex-col">
                          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-900 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0 font-mono">
                            <span>Repository Documentation</span>
                            <Icon icon="simple-icons:github" className="text-sm text-slate-400" />
                          </div>
                          <div className="flex-1 overflow-y-auto p-5 custom-scroll bg-slate-950/10">
                            <div className="markdown-body custom-md-body">
                              <React.Suspense fallback={<div className="flex items-center justify-center p-8"><Spinner size={30} color="var(--brand)" /></div>}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {readme}
                                </ReactMarkdown>
                              </React.Suspense>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 min-h-[250px] rounded-xl border border-slate-900 bg-slate-950/15 p-5 flex flex-col items-center justify-center text-center text-slate-500 py-10">
                          <Icon icon="lucide:terminal" className="text-3xl text-slate-700 mb-2" />
                          <span className="text-xs font-mono">No repository documentation available.</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── SANDBOX PLAYGROUND ENVIRONMENTAL VIEW ── */}
                {activeTab === "playground" && iframeAllowed && iframeLoaded && (
                  <motion.div
                    key="playground"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[calc(85vh-120px)] flex flex-col gap-3 min-h-0"
                  >
                    <div className="flex justify-between items-center text-xs px-2 shrink-0">
                      <span className="text-slate-400 font-mono">Status: Sandbox Connected</span>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-purple-400 hover:text-purple-300 transition"
                      >
                        Open Widescreen ↗
                      </a>
                    </div>

                    <div className="relative flex-1 w-full rounded-xl overflow-hidden border border-slate-900 bg-slate-950 min-h-0 shadow-lg">
                      <AnimatePresence>
                        {!iframeReady && (
                          <motion.div
                            key="spinner"
                            className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Spinner size={45} color="var(--brand)" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <iframe
                        src={project.href}
                        title={project.title}
                        className="w-full h-full border-none relative z-10 bg-white"
                        loading="lazy"
                        onLoad={() => setIframeReady(true)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.dialog>
        </div>
      )}
    </AnimatePresence>
  );
};
