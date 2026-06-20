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
  const [readmeBranch, setReadmeBranch] = useState<string>("main");
  const [iframeAllowed, setIframeAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "playground">(
    "details"
  );
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  // Scroll lock effect to prevent background page from scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  // Fetch GitHub README (Updated with URL parsing & master branch fallback)
  useEffect(() => {
    async function fetchReadme() {
      if (!project) return;
      
      const githubLink = project.links?.find(
        (l) => l.label.toLowerCase() === "github"
      );
      
      if (!githubLink) {
        setReadme(null);
        return;
      }

      try {
        const url = new URL(githubLink.url);
        const pathSegments = url.pathname.split('/').filter(Boolean);

        if (pathSegments.length < 2) {
          setReadme(null);
          return;
        }

        const owner = pathSegments[0];
        const repo = pathSegments[1].replace(/\.git$/, '');

        // Try main branch first
        let res = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
        );
        let activeBranch = "main";

        // If main fails, try master branch
        if (!res.ok) {
          res = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`
          );
          activeBranch = "master";
        }

        if (res.ok) {
          setReadmeBranch(activeBranch);
          setReadme(await res.text());
        } else {
          console.warn("README file not found in both main and master branches.");
          setReadme(null);
        }
      } catch (error) {
        console.error("Error fetching README:", error);
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
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              line-height: 1.7;
              color: #cbd5e1;
            }
            .custom-md-body h1, .custom-md-body h2, .custom-md-body h3, .custom-md-body h4 {
              margin-top: 28px;
              margin-bottom: 16px;
              font-weight: 700;
              line-height: 1.3;
              color: #ffffff;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              padding-bottom: 0.4em;
            }
            .custom-md-body h1 { font-size: 1.5em; }
            .custom-md-body h2 { font-size: 1.3em; }
            .custom-md-body h3 { font-size: 1.15em; }
            .custom-md-body p { margin-top: 0; margin-bottom: 16px; font-size: 14px; font-weight: 400; color: #94a3b8; }
            .custom-md-body ul, .custom-md-body ol { padding-left: 1.5em; margin-bottom: 16px; margin-top: 0; }
            .custom-md-body ul { list-style-type: disc !important; }
            .custom-md-body ol { list-style-type: decimal !important; }
            .custom-md-body li { font-size: 14px; font-weight: 400; margin-bottom: 6px; color: #cbd5e1; }
            .custom-md-body img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 20px auto;
              display: block;
              border: 1px solid rgba(255, 255, 255, 0.08);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            .custom-md-body code {
              padding: 0.2em 0.4em;
              margin: 0;
              font-size: 85%;
              background-color: rgba(255, 255, 255, 0.06);
              border-radius: 6px;
              border: 1px solid rgba(255, 255, 255, 0.04);
              font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace;
              color: #c084fc;
            }
            .custom-md-body pre {
              padding: 16px;
              overflow: auto;
              font-size: 85%;
              line-height: 1.45;
              background-color: #030712;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.06);
              margin-bottom: 16px;
            }
            .custom-md-body pre code {
              background-color: transparent;
              padding: 0;
              color: #e2e8f0;
              border: none;
            }
            .custom-md-body a {
              color: #818cf8;
              text-decoration: underline;
            }
            .custom-md-body blockquote {
              padding: 0 1em;
              color: #94a3b8;
              border-left: 0.25em solid #334155;
              margin: 0 0 16px 0;
            }
            .custom-md-body table {
              border-spacing: 0;
              border-collapse: collapse;
              margin-bottom: 16px;
              width: 100%;
              font-size: 13px;
            }
            .custom-md-body table th, .custom-md-body table td {
              padding: 8px 13px;
              border: 1px solid rgba(255, 255, 255, 0.08);
            }
            .custom-md-body table tr {
              background-color: transparent;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
            }
            .custom-md-body table tr:nth-child(2n) {
              background-color: rgba(255, 255, 255, 0.02);
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
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto pr-1 min-h-0 custom-scroll"
            >
              <AnimatePresence mode="wait">
                {activeTab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="lg:grid lg:grid-cols-12 lg:gap-8 flex flex-col gap-6"
                  >
                    {/* Left Panel: Sticky on desktop */}
                    <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-1 lg:h-fit">
                      {project.image && (
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shrink-0 shadow-lg">
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
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition text-xs font-semibold text-white shadow-md shadow-purple-500/10 cursor-pointer w-full sm:w-auto animate-btn-pulse"
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
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/30 hover:bg-purple-500/5 transition text-xs font-semibold text-slate-200 cursor-pointer w-full sm:w-auto"
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

                    {/* Right Panel: Scrolls naturally */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                      
                      {/* Project description box */}
                      <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-900/80 leading-relaxed text-slate-300 text-sm md:text-base font-light font-sans text-justify shrink-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Project Overview</h4>
                        {project.description}
                      </div>

                      {/* GitHub README Viewer Terminal */}
                      {readme ? (
                        <div className="w-full rounded-xl border border-white/5 bg-slate-950/20 flex flex-col shadow-2xl">
                          <div className="px-5 py-3 bg-slate-950/80 border-b border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                              <span className="ml-2.5 text-slate-400 font-mono">README.md</span>
                            </div>
                            <Icon icon="simple-icons:github" className="text-sm text-slate-500" />
                          </div>
                          <div className="p-6 bg-slate-950/5">
                            <div className="markdown-body custom-md-body">
                              <React.Suspense fallback={<div className="flex items-center justify-center p-8"><Spinner size={30} color="var(--brand)" /></div>}>
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    img: ({ node, src, ...props }) => {
                                      if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                                        const githubLink = project.links?.find(
                                          (l) => l.label.toLowerCase() === "github"
                                        );
                                        if (githubLink) {
                                          try {
                                            const url = new URL(githubLink.url);
                                            const pathSegments = url.pathname.split('/').filter(Boolean);
                                            const owner = pathSegments[0];
                                            const repo = pathSegments[1].replace(/\.git$/, '');
                                            const cleanSrc = src.startsWith("./") ? src.substring(2) : src;
                                            const absoluteSrc = `https://raw.githubusercontent.com/${owner}/${repo}/${readmeBranch}/${cleanSrc}`;
                                            return <img src={absoluteSrc} {...props} />;
                                          } catch (e) {
                                            console.error("Error transforming image src in README", e);
                                          }
                                        }
                                      }
                                      return <img src={src} {...props} />;
                                    },
                                    a: ({ node, href, ...props }) => {
                                      if (href && !href.startsWith("http") && !href.startsWith("#")) {
                                        const githubLink = project.links?.find(
                                          (l) => l.label.toLowerCase() === "github"
                                        );
                                        if (githubLink) {
                                          try {
                                            const url = new URL(githubLink.url);
                                            const pathSegments = url.pathname.split('/').filter(Boolean);
                                            const owner = pathSegments[0];
                                            const repo = pathSegments[1].replace(/\.git$/, '');
                                            const cleanHref = href.startsWith("./") ? href.substring(2) : href;
                                            const absoluteHref = `https://github.com/${owner}/${repo}/blob/${readmeBranch}/${cleanHref}`;
                                            return <a href={absoluteHref} target="_blank" rel="noopener noreferrer" {...props} />;
                                          } catch (e) {
                                            console.error("Error transforming link href in README", e);
                                          }
                                        }
                                      }
                                      return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
                                    }
                                  }}
                                >
                                  {readme}
                                </ReactMarkdown>
                              </React.Suspense>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full rounded-xl border border-slate-900/60 bg-slate-950/20 p-10 flex flex-col items-center justify-center text-center text-slate-500 py-12">
                          <Icon icon="lucide:lock" className="text-3xl text-purple-500/80 mb-3 animate-pulse" />
                          <span className="text-sm font-bold text-slate-200 mb-1 font-sans">Private Repository</span>
                          <span className="text-xs font-mono text-slate-550">Documentation is restricted or private.</span>
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