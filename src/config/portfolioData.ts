import type { Portfolio, TagColors } from "../types/portfolio";

export const PORTFOLIO_INFO: Portfolio = {
  meta: {
    createdAt: new Date().toISOString(),
    locale: "en-US",
    url: "https://satya00089.github.io/portfolio", // update if you have a custom domain
    pdf: "/resume.pdf",
  },
  personal: {
    name: "Dilantha Ranaweera",
    title: "Software Engineer — Full Stack (Nodejs & React)",
    headline: "React · Nodejs · Php  · Cloud",
    avatar: "./profile.jpg",
    summary:
      "Senior Engineer with 7+ years of experience delivering enterprise-grade applications. Over the last 3 years I have focused on building production systems using Python (FastAPI) and React — designing APIs, building responsive frontends, and automating deployments with IaC. Experienced across AWS & Azure and comfortable owning full delivery from design to production.",
    contact: {
      email: "pramudithadilantha89@gmail.com",
      phone: "+94 756813888",
      location: "kegalle",

      socials: [
        {
          label: "LinkedIn",
          url: "www.linkedin.com/in/dilantha-ranaweera-825148295",
          icon: "SiLinkedin",
        },

        {
          label: "GitHub",
          url: "https://github.com/Dilantha2001",
          icon: "SiGithub",
        },
      ],
    },
  },
  highlights: [
    "Software Engineer Internship at postal headquarters (6 mounths)",
    "2+ years focused on Nodejs and React",
    "Experienced with AWS, Azure, Terraform, and CI/CD pipelines",
  ],
  skills: [
    {
      title: "Frontend",
      skills: [
        {
          name: "React",
          level: 90,
          icon: "SiReact",
          category: "frontend",
          years: 3,
          note: "Used in production since 2022",
        },
        {
          name: "TypeScript",
          level: 85,
          icon: "SiTypescript",
          category: "frontend",
          years: 2,
          note: "Used in production since 2024",
        },
        {
          name: "JavaScript",
          level: 90,
          icon: "SiJavascript",
          category: "frontend",
          years: 4,
          note: "Used in production since 2022",
        },
        {
          name: "HTML5",
          level: 90,
          icon: "SiHtml5",
          category: "frontend",
          years: 5,
        },
        {
          name: "CSS3",
          level: 88,
          icon: "SiCss3",
          category: "frontend",
          years: 5,
        },
        {
          name: "Tailwind CSS",
          level: 80,
          icon: "SiTailwindcss",
          category: "frontend",
          years: 3,
          note: "Used in production since 2023",
        },
        {
          name: "Material-UI",
          level: 80,
          icon: "SiMaterialui",
          category: "frontend",
          years: 3,
          note: "Used in production since 2023",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "Php",
          level: 80,
          icon: "SiFastapi",
          category: "backend",
          years: 3,
          note: "Used in production since 2022",
        },
        {
          name: "Node.js",
          level: 80,
          icon: "SiNodedotjs",
          category: "backend",
          years: 2,
          note: "Used in production since 2023",
        },
        {
          name: "Express.js",
          level: 75,
          icon: "SiExpress",
          category: "backend",
          years: 2,
          note: "Used in production since 2023",
        },
        {
          name: "Java ",
          level: 70,
          icon: "SiJava",
          category: "backend",
          years: 2,
          note: "Used in production from 2022",
        },
      ],
    },

    {
      title: "Infrastructure & DevOps",
      skills: [
        {
          name: "AWS",
          level: 78,
          icon: "SiAmazonaws",
          category: "devops",
          years: 0,
          note: "Used in production since 2025",
        },

        {
          name: "Docker",
          level: 75,
          icon: "SiDocker",
          category: "devops",
          years: 0,
          note: "Used in production since 2025",
        },
      ],
    },
    {
      title: "Databases",
      skills: [
        {
          name: "PostgreSQL",
          level: 80,
          icon: "SiPostgresql",
          category: "database",
          years: 2,
          note: "Used in production since 2022",
        },
        {
          name: "MySQL",
          level: 78,
          icon: "SiMysql",
          category: "database",
          years: 3,
          note: "Used in production since 2022",
        },
        {
          name: "MongoDB",
          level: 78,
          icon: "SiMongodb",
          category: "database",
          years: 2,
          note: "Used in production since 2023",
        },
      ],
    },
    {
      title: "Other Tools",
      skills: [
        {
          name: "Git",
          level: 90,
          icon: "SiGit",
          category: "tooling",
          years: 3,
          note: "Used in production since 2022",
        },
        {
          name: "GitHub",
          level: 88,
          icon: "SiGithub",
          category: "tooling",
          years: 3,
          note: "Used in production since 2022",
        },
        {
          name: "Jira",
          level: 85,
          icon: "SiJira",
          category: "tooling",
          years: 1,
          note: "Used in production since 2024",
        },

        {
          name: "VS Code",
          level: 90,
          icon: "SiVisualstudiocode",
          category: "tooling",
          years: 3,
          note: "Used in production since 2022",
        },
      ],
    },
  ],
  experience: [
    {
      id: "unisys-senior-2025",
      title: "Software Engineer",
      company: "Postal Headquarters",
      location: "Colombo",
      date: { start: "2025-07", present: false },
      summary:
        " full-stack efforts around Nodejs-based backends and React frontends for enterprise customers. Driving architecture,  and implementing IaC and cloud deployment practices.",
      bullets: [
        "Lead development of microservices using FastAPI and Python for enterprise-scale workloads.",
        "Design and implement responsive React frontends and component libraries with TypeScript and Tailwind.",
        "Drive IaC adoption using Terraform and Bicep; implement CI/CD pipelines and deployment automation.",
        "Mentor engineers, conduct design reviews, and improve code quality and observability.",
      ],
      tech: ["Nodejs", "Php", "React", "TypeScript"],
    },
  ],
  projects: [
    {
      id: "dog-behavior-ai",
      title: "AI-Powered Dog Behavior Monitoring",
      description:
        "A multimodal AI system using YOLOv8, ResNet-50, and LSTM to classify canine emotions and behaviors. Features dual-pathway visual processing and audio signal analysis for real-time monitoring.",
      tags: [
        "Python",
        "YOLOv8",
        "TensorFlow",
        "Computer Vision",
        "Multimodal AI",
        "Research",
      ],
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx.../giphy.gif",
      href: "#",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/dog-behavior-monitor",
          icon: "SiGithub",
        },
      ],
    },
    {
      id: "trust-post-logistics",
      title: "Trust Post Logistics System",
      description:
        "A comprehensive parcel delivery platform developed for the Sri Lankan Postal Department. Features real-time GPS tracking, secure transactions, and a specialized admin/manager dashboard.",
      tags: [
        "React",
        "Node.js",
        "PostgreSQL",
        "GPS APIs",
        "Full Stack",
        "Logistics",
      ],
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx.../giphy.gif",
      href: "#",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/trust-post-logistics",
          icon: "SiGithub",
        },
      ],
    },
    {
      id: "music-streaming-app",
      title: "Dynamic Music Application",
      description:
        "Full-stack music engine with custom audio playback, MongoDB aggregation pipelines for trending charts, and JWT-based authentication for a secure user ecosystem.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Cloudinary", "Redux"],
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx.../giphy.gif",
      href: "#",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/music-app",
          icon: "SiGithub",
        },
      ],
    },
    {
      id: "ecommerce-engine",
      title: "High-Performance E-Commerce Engine",
      description:
        "E-commerce solution built with TypeScript and Redux Toolkit. Features server-side SQL filtering for product discovery and a simulated Stripe API checkout flow.",
      tags: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "PostgreSQL",
        "Stripe API",
      ],
      image: undefined,
      href: "#",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/ecommerce-ts",
          icon: "SiGithub",
        },
      ],
    },
    {
      id: "online-book-store",
      title: "MERN Online Book Store",
      description:
        "A full-stack bookshop enabling users to browse and purchase books. Includes an admin dashboard for inventory management and order status tracking.",
      tags: ["React", "Tailwind CSS", "MongoDB", "Express", "Chart.js"],
      image: undefined,
      href: "#",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/book-store",
          icon: "SiGithub",
        },
      ],
    },
    {
      id: "portfolio-website",
      title: "Professional Portfolio",
      description:
        "A modern, responsive portfolio built with TypeScript and React to showcase software engineering projects and technical expertise with optimized UI/UX.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      image: undefined,
      href: "https://dilantha-ranaweera.dev",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/portfolio",
          icon: "SiGithub",
        },
      ],
    },
    {
      id: "university-ordering-system",
      title: "Legacy Food Ordering System",
      description:
        "A responsive university group project focused on backend processing and database management using PHP and MySQL for efficient menu and order handling.",
      tags: ["PHP", "MySQL", "HTML", "CSS", "Group Project"],
      image: undefined,
      href: "#",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Dilantha-Ranaweera/php-ordering-system",
          icon: "SiGithub",
        },
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      school: "Biju Patnaik University of Technology",
      date: "2013-2017",
    },
    {
      degree: "Higher Secondary",
      school: "Bellaguntha Science College",
      date: "2011-2013",
    },
    {
      degree: "High School",
      school: "G.T High School Bellaguntha",
      date: "2011",
    },
  ],
  certifications: [
    {
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "2022",
      url: "https://www.credly.com/badges/56ba404b-b2ec-49d7-b869-d41c8c88d7b5",
    },
    {
      name: "Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
    },
  ],
  extras: {
    languages: [{ name: "English", level: "Native" }],
    interests: ["astronomy", "music"],
  },
};

// ---------- SMALL HELPERS ----------
export const tagColors: TagColors = {
  React: "bg-blue-100 text-blue-800",
  CSS: "bg-teal-100 text-teal-800",
  CSS3: "bg-teal-100 text-teal-800",
  Tailwind: "bg-teal-100 text-teal-800",
  Stripe: "bg-purple-100 text-purple-800",
  "Design System": "bg-yellow-100 text-yellow-800",
  D3: "bg-amber-100 text-amber-800",
  Realtime: "bg-green-100 text-green-800",
  Storybook: "bg-pink-100 text-pink-800",
  "NPM Package": "bg-red-100 text-red-800",
  "Material-UI": "bg-indigo-100 text-indigo-800",
  Chatbot: "bg-violet-100 text-violet-800",
  OpenAI: "bg-gray-100 text-gray-800",
  "Hugging Face": "bg-orange-100 text-orange-800",
  Beginner: "bg-cyan-100 text-cyan-800",
  "Beginner Project": "bg-cyan-100 text-cyan-800",
  // Landing Zone Orchestrator tags
  FastAPI: "bg-teal-500 text-white",
  MongoDB: "bg-green-600 text-white",
  Terraform: "bg-purple-600 text-white",
  IaC: "bg-indigo-500 text-white",
  AWS: "bg-orange-500 text-white",
  Azure: "bg-blue-600 text-white",
  "Full Stack": "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
};
