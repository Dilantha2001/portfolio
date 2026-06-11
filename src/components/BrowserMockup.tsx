// BrowserMockup.tsx
// Realistic macOS-style browser window frame with a live scrollable iframe inside
import React, { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

interface BrowserMockupProps {
  url: string;
  title?: string;
  className?: string;
  /** Height of the visible viewport area in px (default: 420) */
  viewportHeight?: number;
}

const BrowserMockup: React.FC<BrowserMockupProps> = ({
  url,
  title = "Live Preview",
  className = "",
  viewportHeight = 420,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: true, margin: "200px" });

  // Scale trick: render iframe at 160% width/height then scale down to 62.5%
  // so the site looks like a proper desktop page inside the frame
  const SCALE = 0.625;
  const iframeW = `${100 / SCALE}%`;
  const iframeH = `${viewportHeight / SCALE}px`;

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      ref={containerRef}
      className={`browser-mockup-root ${className}`}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #2a2a2e 0%, #1a1a1e 100%)",
      }}
    >
      {/* ── Browser Chrome (Title Bar) ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #3c3c40 0%, #2e2e32 100%)",
          padding: "10px 14px 9px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          userSelect: "none",
        }}
      >
        {/* Traffic-light dots */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((color, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: color,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
                display: "block",
              }}
            />
          ))}
        </div>

        {/* ─ Back / Forward / Refresh (decorative) ─ */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0, opacity: 0.35 }}>
          {/* ← */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {/* → */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          {/* ↺ */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
          </svg>
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "7px",
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            minWidth: 0,
          }}
        >
          {/* Lock icon */}
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
            <rect x="1" y="5" width="8" height="7" rx="1.5" fill="#9CA3AF" />
            <path d="M2.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.55)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {displayUrl}
          </span>
        </div>

        {/* Open in new tab */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            flexShrink: 0,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* ── iframe Viewport ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${viewportHeight}px`,
          background: "#0f0f11",
          overflow: "hidden",
        }}
      >
        {/* Loading spinner */}
        <AnimatePresence>
          {!loaded && !error && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#0f0f11",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                zIndex: 3,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                  width: 34,
                  height: 34,
                  border: "3px solid rgba(95,103,230,0.2)",
                  borderTop: "3px solid #5F67E6",
                  borderRadius: "50%",
                }}
              />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui, sans-serif" }}>
                Loading live preview…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        {error && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "#0f0f11",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Preview unavailable</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#5F67E6", textDecoration: "underline" }}
            >
              Open site ↗
            </a>
          </div>
        )}

        {/* The live iframe */}
        {!error && isVisible ? (
          <iframe
            src={url}
            title={title}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{
              width: iframeW,
              height: iframeH,
              border: "none",
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "auto",
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : !error ? (
          <div className="absolute inset-0 bg-[#0f0f11] flex items-center justify-center">
            <span className="text-xs text-slate-500">Scroll down to load interactive preview</span>
          </div>
        ) : null}

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "48px",
            background: "linear-gradient(to top, rgba(15,15,17,0.9) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default BrowserMockup;
