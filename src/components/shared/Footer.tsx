import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_INFO } from '../../config/portfolioData';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!footerRef.current) return;
    
    let ctx = gsap.context(() => {
      const elements = footerRef.current?.querySelectorAll('.footer-heading, .footer-form, .footer-links-area, .footer-bottom');
      
      if (elements) {
        gsap.from(elements, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  const HoverText = ({ text, isHighlight }: { text: string; isHighlight: boolean }) => (
    <span className={isHighlight ? "highlight" : ""}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className={`hover-char ${isHighlight ? 'hover-char-highlight' : 'hover-char-normal'}`}
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </span>
      ))}
    </span>
  );

  return (
    <section className="footer-section" ref={footerRef} id="contact">
      <div className="footer-container">
        
        <h1 
          className="footer-heading"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HoverText text="READY FOR " isHighlight={true} /> 
          <div className="heading-inline-img-wrapper">
            <img 
              src={PORTFOLIO_INFO.personal.avatar}
              alt="Portrait 1" 
              className={`heading-inline-img grayscale ${isHovered ? 'img-hidden' : 'img-visible'}`} 
            /> 
            <img 
              src={PORTFOLIO_INFO.personal.avatar}
              alt="Portrait 2" 
              className={`heading-inline-img ${isHovered ? 'img-visible' : 'img-hidden'}`} 
            /> 
          </div>
          <HoverText text=" YOUR" isHighlight={false} /><br />
          <HoverText text="PRESTIGE" isHighlight={true} />
          <HoverText text=" MOMENT?" isHighlight={false} />
        </h1>

        <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="" />
          </div>
          <button type="submit" className="submit-btn">
            Submit <span className="arrow">↵</span>
          </button>
        </form>

        <div className="footer-links-area">
          <div className="footer-socials">
            <span className="label">Follow</span>
            <div className="social-icons">
              {PORTFOLIO_INFO.personal.contact.socials.map((social) => (
                <a key={social.label} href={social.url.startsWith("http") ? social.url : `https://${social.url}`} target="_blank" rel="noopener noreferrer" className="icon" title={social.label}>
                  {social.label.substring(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-contact">
            <span className="label">Write</span>
            <a href={`mailto:${PORTFOLIO_INFO.personal.contact.email}`} className="contact-email">
              {PORTFOLIO_INFO.personal.contact.email.toUpperCase()}
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {PORTFOLIO_INFO.personal.name.toUpperCase()}, {new Date().getFullYear()}</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </section>
  );
};

export default Footer;
