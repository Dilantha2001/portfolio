import React, { useRef, useState } from "react";
import gsap from "gsap";
import "./FAQSection.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is your typical development workflow?",
    answer: "I follow a structured approach to ensure premium results: Discovery & Scoping (aligning on features), UI/UX Design (wireframes & layouts), Full-Stack Development (clean, typesafe coding), Quality Assurance (performance & bug testing), and final Deployment with post-launch support.",
  },
  {
    question: "Which core technologies do you specialize in?",
    answer: "My primary backend and frontend stacks are built on TypeScript, React, Node.js, Express, and databases like MySQL, PostgreSQL, and MongoDB. I also specialize in AI integrations, utilizing Python and OpenCV/YOLOv8 pipelines for automated behavioral and spatial analysis.",
  },
  {
    question: "Do you offer post-deployment maintenance and updates?",
    answer: "Absolutely. I provide ongoing maintenance plans that cover database backups, routine security patches, API dependency updates, server optimizations, and feature enhancements to keep your platform running flawlessly.",
  },
  {
    question: "How do you handle communication and project updates?",
    answer: "Transparency is critical. I use platforms like Slack, Discord, and Trello for day-to-day coordination. I provide weekly progress updates and host private live preview links (staging environments) so you can review changes incrementally.",
  },
  {
    question: "Are you willing to sign a Non-Disclosure Agreement (NDA)?",
    answer: "Yes, I respect your intellectual property. I am fully open to signing standard NDAs before discussing proprietary details, system logic, or project assets.",
  },
];

const FAQItemComponent: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const plusBlockRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackProgressRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(titleRef.current, { x: 15, color: "#a855f7", duration: 0.7, ease: "expo.out", overwrite: "auto" });
    gsap.to(plusBlockRef.current, { 
      scale: 1.15,
      rotation: 90,
      borderColor: "rgba(168, 85, 247, 0.4)",
      duration: 0.7, 
      ease: "expo.out", 
      overwrite: "auto" 
    });
    gsap.to(trackProgressRef.current, { width: "100%", backgroundColor: "#a855f7", duration: 0.7, ease: "expo.out", overwrite: "auto" });
  };

  const handleMouseLeave = () => {
    gsap.to(titleRef.current, { x: 0, color: "var(--text-light)", duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(plusBlockRef.current, { 
      scale: 1,
      rotation: 0,
      borderColor: "var(--border-color)",
      duration: 0.5, 
      ease: "power2.out", 
      overwrite: "auto" 
    });
    
    if (!isOpen) {
      gsap.to(trackProgressRef.current, { width: "0%", backgroundColor: "var(--text-light)", duration: 0.5, ease: "power2.out", overwrite: "auto" });
    } else {
      gsap.to(trackProgressRef.current, { backgroundColor: "var(--text-light)", duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  const handleClick = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.7, ease: "expo.inOut", overwrite: "auto" });
      gsap.to(verticalLineRef.current, { rotation: 0, duration: 0.7, ease: "expo.inOut", overwrite: "auto" });
      gsap.to(trackProgressRef.current, { width: "100%", duration: 0.4, overwrite: "auto" });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.6, ease: "expo.inOut", overwrite: "auto" });
      gsap.to(verticalLineRef.current, { rotation: 90, duration: 0.6, ease: "expo.inOut", overwrite: "auto" });
      gsap.to(trackProgressRef.current, { width: "0%", duration: 0.6, ease: "expo.inOut", overwrite: "auto" });
    }
  };

  return (
    <div className="faq-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      <div className="faq-top-wrap">
        <h3 className="faq-title" ref={titleRef}>{index + 1}. {item.question}</h3>
        <div className="plus-block" ref={plusBlockRef}>
          <div className="plus-line horizontal"></div>
          <div className="plus-line vertical" ref={verticalLineRef} style={{ transform: "rotate(90deg)" }}></div>
        </div>
      </div>
      <div className="faq-content" ref={contentRef}>
        <p className="faq-answer">{item.answer}</p>
      </div>
      <div className="faq-track">
        <div className="track-line"></div>
        <div className="track-progress" ref={trackProgressRef}></div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  return (
    <section className="faq-section select-none">
      <div className="faq-container-box">
        <div className="faq-header">
          <div className="overflow-mask">
            <h2 className="text-item">Common</h2>
          </div>
          <div className="overflow-mask">
            <h2 className="text-item text-muted">questions</h2>
          </div>
        </div>
        <div className="faq-container">
          {FAQS.map((faq, index) => (
            <FAQItemComponent key={index} item={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
