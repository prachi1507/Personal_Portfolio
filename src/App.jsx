import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Icon, { Star } from "./Icons.jsx";
import { CrmPreview, SupportPreview } from "./ProjectPreviews.jsx";
import {
  AnimatedName,
  CountUp,
  CursorGlow,
  MagneticLink,
  TiltPreview,
} from "./Animation.jsx";

const Sculpture = lazy(() => import("./Sculpture.jsx"));
const email = "kprachimth@gmail.com";
const projects = [
  {
    name: "Skyline CRM AI",
    type: "FULL-STACK DEVELOPMENT · AI INTEGRATION",
    description:
      "A smarter workspace for leads, relationships, and the next big deal.",
    overview:
      "A cloud-based CRM SaaS platform that brings lead management, sales pipelines, contacts, tasks, and analytics into one workspace. Google Gemini adds lead summaries, email generation, and sales insights.",
    stack: ["React", "Node.js", "MongoDB", "Gemini API"],
    allStack: [
      "React",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Google Gemini API",
      "Socket.io",
      "JWT",
      "Docker",
      "GitHub Actions",
      "AWS EC2",
      "Nginx",
      "Jest",
      "React Testing Library",
    ],
    details: [
      "Built lead, contact, task, and sales pipeline workflows.",
      "Integrated AI-generated summaries, emails, and sales insights.",
      "Implemented secure multi-tenant architecture and real-time capabilities.",
      "Used containerised deployment and automated delivery workflows.",
    ],
    link: "https://skylinedeals.in/",
    Preview: CrmPreview,
  },
  {
    name: "Customer Support SaaS",
    type: "PRODUCT ENGINEERING · GENERATIVE AI",
    description:
      "Thoughtful automation that brings the human side back to customer support.",
    overview:
      "An AI-powered customer support platform that automates ticket management with LLM-driven intent classification, contextual response generation, and intelligent escalation workflows.",
    stack: ["Next.js", "Node.js", "MongoDB", "OpenAI API"],
    allStack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "OpenAI API",
      "GitHub APIs",
      "Webhooks",
      "Docker",
      "GitHub Actions",
      "JWT",
    ],
    details: [
      "Developed intent classification and contextual response generation.",
      "Built intelligent escalation and ticket management workflows.",
      "Supported secure multi-role access and real-time collaboration.",
      "Integrated analytics and cloud-native deployment workflows.",
    ],
    Preview: SupportPreview,
  },
];
const skillGroups = [
  {
    label: "Frontend",
    icon: "code",
    title: "Interfaces that feel right.",
    text: "Responsive, reusable interfaces with attention to the details people actually notice.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "JavaScript",
      "HTML & CSS",
      "D3.js",
      "Responsive UI",
    ],
  },
  {
    label: "Backend",
    icon: "layers",
    title: "A solid foundation underneath.",
    text: "Well-structured APIs, thoughtful data models, and dependable application architecture.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "JWT",
      "Socket.io",
    ],
  },
  {
    label: "AI & automation",
    icon: "spark",
    title: "Intelligence with a purpose.",
    text: "Practical AI integrations that turn repetitive workflows into useful product features.",
    skills: [
      "Generative AI",
      "LLM integration",
      "Google Gemini API",
      "OpenAI API",
      "Intent classification",
      "AI-powered workflows",
    ],
  },
  {
    label: "Cloud & tools",
    icon: "globe",
    title: "Built to make it into the world.",
    text: "From version control to deployment, keeping the delivery process consistent and maintainable.",
    skills: [
      "AWS EC2 & S3",
      "Docker",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
      "Git",
      "Linux",
      "Agile / Scrum",
    ],
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const breakpoint = window.matchMedia("(min-width: 761px)");
    const close = () => {
      if (breakpoint.matches) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    breakpoint.addEventListener("change", close);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", escape);
      breakpoint.removeEventListener("change", close);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <a
          className="brand"
          href="#home"
          aria-label="Prachi, back to top"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            p<span>.</span>
          </span>
          <span>
            prachi<span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          id="main-navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          {["work", "about", "experience"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={active === item ? "is-active" : ""}
              aria-current={active === item ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </nav>
        <MagneticLink className="nav-contact" href="#contact">
          Let’s talk <Icon size={17} />
        </MagneticLink>
        <button
          ref={toggleRef}
          className="menu-toggle icon-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 125]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, 11]);
  return (
    <section id="home" className="hero section-shell" ref={heroRef}>
      <div className="hero-main">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">
              <span className="status-dot" /> A LITTLE LOGIC. A LITTLE MAGIC.
            </p>
          </Reveal>
          <motion.h1
            aria-label="Hi, I’m Prachi."
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            Hi, I’m
            <br />
            <AnimatedName />
            <Star className="hero-star" />
          </motion.h1>
          <Reveal delay={0.18}>
            <p className="hero-role">
              Full-stack software engineer. <span>MERN stack & AI solutions.</span>
            </p>
            <p className="hero-description">
              I bring ideas to life through thoughtful code, useful AI, and web
              experiences that feel a little more human.
            </p>
            <div className="hero-actions">
              <MagneticLink className="button button-mint" href="#work">
                Explore my work <Icon name="down" size={18} />
              </MagneticLink>
              <a className="text-link" href="/Prachi_Resume.pdf" download>
                Download resume <Icon name="download" size={17} />
              </a>
            </div>
            <div className="hero-proof">
              <span className="proof-mark">
                <Icon name="layers" size={19} />
              </span>
              <p>
                <strong>3+ years of building with purpose.</strong>
                <span>From the first idea to the final detail.</span>
              </p>
            </div>
          </Reveal>
        </div>
        <motion.div
          className="hero-art"
          style={reduce ? undefined : { y: artY, rotate: artRotate }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.15 }}
        >
          <div className="art-grid" />
          <div className="art-aura" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="orbit-point point-one" />
          <span className="orbit-point point-two" />
          <Suspense
            fallback={
              <div className="sculpture-canvas">
                <div className="sculpture-fallback">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            }
          >
            <Sculpture />
          </Suspense>
          <div className="art-label art-label-top">
            <span className="label-icon">
              <Icon name="code" size={18} />
            </span>
            <span>
              Thoughtfully engineered.
              <br />
              <b>Made to make a difference.</b>
            </span>
          </div>
          <div className="art-label art-label-bottom">
            <Icon name="spark" size={17} />
            <span>Curiosity, turned into code.</span>
          </div>
          <span className="art-coordinate">
            FIG. 01 / CREATIVE IN EVERY DIMENSION
            <br />
            INTERACTIVE EXPLORATION
          </span>
          <Star className="art-star" />
        </motion.div>
      </div>
      <Reveal className="hero-bottom">
        <div className="hero-location">
          <Icon name="globe" size={16} />
          <span>BASED IN PUNE, INDIA</span>
        </div>
        <p>Good things happen where creativity meets code.</p>
        <a
          href="#work"
          className="scroll-cue"
          aria-label="Scroll to selected work"
        >
          <span>SCROLL TO EXPLORE</span>
          <Icon name="down" size={15} />
        </a>
      </Reveal>
    </section>
  );
}

function TechStrip() {
  const names = [
    "REACT",
    "NEXT.JS",
    "NODE.JS",
    "TYPESCRIPT",
    "MONGODB",
    "GENERATIVE AI",
    "AWS",
  ];
  return (
    <div
      className="tech-strip"
      role="img"
      aria-label={`Working with ${names.join(", ")}`}
    >
      <div className="tech-track" aria-hidden="true">
        {[0, 1].map((set) => (
          <div className="tech-set" key={set}>
            {names.map((name) => (
              <span key={name}>
                {name}
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, close }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!project) return undefined;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);
  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }
      }}
      aria-labelledby="project-title"
    >
      {project && (
        <>
          <div className="dialog-top">
            <span className="eyebrow">PROJECT DETAILS</span>
            <button
              className="icon-button"
              autoFocus
              onClick={close}
              aria-label="Close project details"
            >
              <Icon name="close" />
            </button>
          </div>
          <h2 id="project-title">{project.name}</h2>
          <p className="dialog-overview">{project.overview}</p>
          <h3>What I built</h3>
          <ul className="project-details-list">
            {project.details.map((detail) => (
              <li key={detail}>
                <Icon name="check" size={17} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <h3>The toolkit</h3>
          <div className="tags modal-tags">
            {project.allStack.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="dialog-actions">
            {project.link ? (
              <a
                className="button button-mint"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit Skyline <Icon />
              </a>
            ) : (
              <a
                className="button button-mint"
                href={`mailto:${email}?subject=Let%27s%20talk%20about%20your%20support%20platform`}
              >
                Ask me about this project <Icon />
              </a>
            )}
            <button className="text-link" onClick={close}>
              Back to work <Icon name="right" size={17} />
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

function Work({ onProject }) {
  return (
    <section id="work" className="work-section section-shell">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow muted">01 / SELECTED WORK</p>
          <h2>
            Selected work,
            <br />
            <span className="serif">thoughtfully built.</span>
          </h2>
        </div>
        <p>
          A selection of products where thoughtful
          <br className="desktop-break" /> engineering meets real-world
          problems.
        </p>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal
            className="project-card"
            key={project.name}
            delay={index * 0.08}
          >
            <TiltPreview project={project} onOpen={() => onProject(project)} />
            <div className="project-info">
              <span className="project-number" aria-hidden="true">
                0{index + 1}
                <span> / FEATURED PROJECT</span>
              </span>
              <p className="eyebrow muted">{project.type}</p>
              <div className="project-title-row">
                <h3>
                  <button onClick={() => onProject(project)}>
                    {project.name}
                  </button>
                </h3>
                <button
                  className="project-arrow icon-button"
                  onClick={() => onProject(project)}
                  aria-label={`View ${project.name} details`}
                >
                  <Icon size={22} />
                </button>
              </div>
              <p>{project.description}</p>
              <div className="tags">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                className="project-read-link text-link"
                onClick={() => onProject(project)}
                aria-label={`Read about ${project.name}`}
              >
                Explore the project <Icon name="right" size={18} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="work-footer">
        <span>Good products start with a good conversation.</span>
        <a
          className="text-link"
          href="https://github.com/prachi1507"
          target="_blank"
          rel="noreferrer"
        >
          More on GitHub <Icon size={17} />
        </a>
      </Reveal>
    </section>
  );
}

function About() {
  const [tab, setTab] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef([]);
  const active = skillGroups[tab];
  const changeWithKey = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % skillGroups.length;
    else if (event.key === "ArrowLeft")
      next = (index + skillGroups.length - 1) % skillGroups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skillGroups.length - 1;
    else return;
    event.preventDefault();
    setTab(next);
    tabs.current[next]?.focus();
  };
  return (
    <section id="about" className="about-section">
      <div className="section-shell">
        <Reveal className="about-intro">
          <div>
            <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
            <h2>
              Curiosity is
              <br />
              my <span className="serif">default setting.</span>
            </h2>
            <div className="about-signature">
              <Star />
              <span>
                Prachi<span className="signature-dot">.</span>
              </span>
            </div>
            <div className="about-note">
              <span className="note-line" />
              <p>
                Equal parts analytical
                <br />
                and endlessly curious.
              </p>
              <Icon name="spark" size={26} />
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              I like understanding how things work.
              <br />I love making them work better.
            </p>
            <p>
              I’m a full-stack software engineer based in Pune, with 3+ years of
              experience building web applications and AI-integrated SaaS
              products.
            </p>
            <p>
              From a responsive React interface to the API behind it, I enjoy
              connecting the pieces. My work combines clean architecture,
              practical AI, and a focus on the person using the product.
            </p>
            <div className="about-facts">
              <div>
                <CountUp value={3} suffix="+" />
                <span>YEARS OF EXPERIENCE</span>
              </div>
              <div>
                <CountUp value={30} prefix="~" suffix="%" />
                <span>PAGE LOAD TIME REDUCED</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="principles-grid">
          <div>
            <span className="principle-icon">
              <Icon name="code" size={23} />
            </span>
            <span className="eyebrow">01 / CRAFT</span>
            <h3>Care in the details.</h3>
            <p>
              Clean code, thoughtful interfaces, and the small things that make
              a product feel right.
            </p>
          </div>
          <div>
            <span className="principle-icon">
              <Icon name="layers" size={23} />
            </span>
            <span className="eyebrow">02 / CLARITY</span>
            <h3>Complex made simple.</h3>
            <p>
              Connecting the frontend, backend, and everything in between into
              one clear experience.
            </p>
          </div>
          <div>
            <span className="principle-icon">
              <Icon name="spark" size={23} />
            </span>
            <span className="eyebrow">03 / CURIOSITY</span>
            <h3>Always exploring.</h3>
            <p>
              Learning new tools and finding practical ways to bring useful AI
              into everyday products.
            </p>
          </div>
        </Reveal>
        <Reveal className="skills-area">
          <div className="skills-heading">
            <p className="eyebrow">MY EVERYDAY TOOLKIT</p>
            <span>Different tools. One thoughtful experience.</span>
          </div>
          <div
            className="skill-tabs"
            role="tablist"
            aria-label="Technical skill categories"
          >
            {skillGroups.map((group, index) => (
              <button
                key={group.label}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                role="tab"
                id={`skill-tab-${index}`}
                aria-selected={index === tab}
                aria-controls="skill-panel"
                tabIndex={index === tab ? 0 : -1}
                onClick={() => setTab(index)}
                onKeyDown={(event) => changeWithKey(event, index)}
              >
                <Icon name={group.icon} size={17} />
                {group.label}
              </button>
            ))}
          </div>
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            id="skill-panel"
            aria-labelledby={`skill-tab-${tab}`}
            tabIndex={0}
            className="skill-panel"
          >
            <div>
              <h3>{active.title}</h3>
              <p>{active.text}</p>
            </div>
            <div className="skill-pills">
              {active.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section section-shell">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow muted">03 / THE JOURNEY SO FAR</p>
          <h2>
            Always building.
            <br />
            <span className="serif">Always growing.</span>
          </h2>
        </div>
        <a className="text-link" href="/Prachi_Resume.pdf" download>
          Get the full resume <Icon name="download" size={17} />
        </a>
      </Reveal>
      <Reveal className="experience-list">
        <details open>
          <summary>
            <span className="experience-number">01</span>
            <div className="experience-role">
              <h3>Software Engineer-II</h3>
              <p>Bqarlson Software Technologies Pvt. Ltd.</p>
            </div>
            <span className="experience-date">MAR 2026 — PRESENT</span>
            <span className="details-toggle" aria-hidden="true" />
          </summary>
          <div className="experience-description">
            <p>
              Built and improved end-to-end MERN applications, translating
              business requirements into production-ready software in an Agile
              environment.
            </p>
            <ul>
              <li>
                Developed frontend and backend features with React, Redux
                Toolkit, TypeScript, Node.js, Express.js, and MongoDB.
              </li>
              <li>
                Reduced page load time by approximately 30% through code
                splitting, lazy loading, memoization, and API caching.
              </li>
              <li>
                Designed and integrated RESTful APIs, improving application
                responsiveness and data exchange efficiency by 25%.
              </li>
            </ul>
            <div className="tags">
              <span>Full-stack engineering</span>
              <span>Performance</span>
              <span>REST APIs</span>
            </div>
          </div>
        </details>
        <details>
          <summary>
            <span className="experience-number">02</span>
            <div className="experience-role">
              <h3>Software Engineer</h3>
              <p>Beckhoff Automation Pvt. Ltd.</p>
            </div>
            <span className="experience-date">AUG 2024 — FEB 2026</span>
            <span className="details-toggle" aria-hidden="true" />
          </summary>
          <div className="experience-description">
            <p>
              Developed web applications for workforce management, AI chatbots,
              and QA automation solutions.
            </p>
            <ul>
              <li>
                Built reusable React components, including modals, charts, and
                data tables.
              </li>
              <li>
                Applied JavaScript, TypeScript, SOLID principles, and design
                patterns to scalable application code.
              </li>
              <li>
                Worked with Docker environments and supported Git-based CI/CD
                workflows.
              </li>
            </ul>
            <div className="tags">
              <span>React & TypeScript</span>
              <span>Product engineering</span>
              <span>CI/CD</span>
            </div>
          </div>
        </details>
        <details>
          <summary>
            <span className="experience-number">03</span>
            <div className="experience-role">
              <h3>Associate Software Engineer</h3>
              <p>Gut Lernen Technocraft Pvt. Ltd.</p>
            </div>
            <span className="experience-date">APR 2023 — JUL 2024</span>
            <span className="details-toggle" aria-hidden="true" />
          </summary>
          <div className="experience-description">
            <p>
              Developed and maintained responsive web application features with
              JavaScript, React, HTML, and CSS.
            </p>
            <ul>
              <li>
                Supported REST API integration, debugging, and bug fixes.
              </li>
              <li>
                Collaborated with the development team on code reviews and Agile
                delivery.
              </li>
            </ul>
            <div className="tags">
              <span>Frontend development</span>
              <span>API integration</span>
              <span>Agile delivery</span>
            </div>
          </div>
        </details>
      </Reveal>
      <Reveal className="education">
        <p className="eyebrow muted">THE FOUNDATION</p>
        <div className="education-item">
          <span className="education-icon">
            <Icon name="layers" size={21} />
          </span>
          <div>
            <h3>Master of Computer Applications</h3>
            <p>Sinhgad Institute of Management · 73.8%</p>
          </div>
          <span>MCA</span>
        </div>
        <div className="education-item">
          <span className="education-icon">
            <Icon name="code" size={21} />
          </span>
          <div>
            <h3>B.Sc. in Computer Science</h3>
            <p>H.V. Desai College of Science, Pune · 71.2%</p>
          </div>
          <span>B.SC.</span>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus("Select the email address to copy it.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyStatus(""), 3500);
  };
  return (
    <section id="contact" className="contact-section">
      <div className="section-shell">
        <Reveal className="contact-heading">
          <p className="eyebrow muted">04 / NEXT, SOMETHING GREAT</p>
          <div className="contact-title">
            <h2>
              Let’s make
              <br />
              <span className="serif accent">something matter.</span>
            </h2>
            <MagneticLink
              href={`mailto:${email}`}
              className="contact-orb"
              aria-label="Start a conversation by email"
            >
              <Icon size={60} />
            </MagneticLink>
          </div>
          <div className="contact-bottom">
            <p>
              A product to build, a problem to solve,
              <br />
              or just a hello. My inbox is open.
            </p>
            <div className="email-area">
              <div className="email-row">
                <a href={`mailto:${email}`}>{email}</a>
                <button
                  className="icon-button copy-email"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  <Icon
                    name={copyStatus === "Email copied" ? "check" : "copy"}
                    size={17}
                  />
                </button>
              </div>
              <span className="copy-status" role="status">
                {copyStatus}
              </span>
            </div>
          </div>
        </Reveal>
        <footer>
          <div className="footer-top">
            <a className="brand" href="#home">
              <span>
                prachi<span className="brand-dot">.</span>
              </span>
            </a>
            <div className="social-links">
              <a
                href="https://github.com/prachi1507"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Icon size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/prachi-choudhary15/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Icon size={15} />
              </a>
              <a href="/Prachi_Resume.pdf" download>
                Resume <Icon name="download" size={15} />
              </a>
            </div>
            <a href="#home" className="back-top">
              Back to top <Icon name="down" size={16} />
            </a>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            PRACHI<span>✳</span>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Prachi</span>
            <span>BUILT WITH CURIOSITY. CRAFTED WITH CARE.</span>
            <span>
              PUNE, INDIA <span className="status-dot" />
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function App() {
  const [project, setProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Navigation />
      <CursorGlow />
      <main id="main-content">
        <Hero />
        <TechStrip />
        <Work onProject={setProject} />
        <About />
        <Experience />
        <Contact />
      </main>
      <ProjectModal project={project} close={() => setProject(null)} />
    </>
  );
}
