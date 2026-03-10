"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import content from "@/lib/content";

const {
  sectionTitle,
  sectionNumber,
  headline,
  email,
  socials: SOCIALS,
  form: FORM,
  footer: FOOTER,
} = content.contact;

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".contact-headline span", { y: "0%", rotateZ: 0 });
        gsap.set(".contact-form", { opacity: 1 });
        gsap.set(".footer-content", { opacity: 1 });
        return;
      }

      gsap.fromTo(
        ".contact-headline span",
        { y: "110%", rotateZ: 3 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".contact-headline",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".footer-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-content",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const userEmail = formData.get("email") as string;
    const message = formData.get("message") as string;

    setFormStatus("sending");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${userEmail}\n\n${message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setTimeout(() => setFormStatus("sent"), 1000);
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-32 md:pt-48 overflow-hidden"
    >
      <div className="ambient-glow glow-ambient bottom-0 left-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-32 md:mb-48">
          <div className="lg:col-span-6 contact-headline">
            <h3 className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter leading-[0.95]">
              <div className="overflow-hidden">
                <span className="inline-block">{headline[0]}</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block">
                  {headline[1].split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="font-serif italic font-light text-primary">
                    {headline[1].split(" ").at(-1)}
                  </span>
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block">{headline[2]}</span>
              </div>
            </h3>

            <div className="mt-12 flex flex-col gap-4">
              <a
                href={`mailto:${email}`}
                className="text-lg md:text-xl text-foreground/70 hover:text-primary transition-colors duration-300 w-fit"
              >
                {email}
              </a>
              <div className="flex gap-6 mt-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors duration-300"
                  >
                    {social.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form
              className="contact-form opacity-0 flex flex-col gap-0 border-t border-foreground/8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px">
                <div className="relative border-b border-foreground/8 group">
                  <label
                    htmlFor="contact-name"
                    className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold pointer-events-none"
                  >
                    {FORM.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent pt-10 pb-4 text-base text-foreground outline-none border-none placeholder:text-foreground/15 focus:placeholder:text-foreground/25 transition-colors"
                    placeholder={FORM.namePlaceholder}
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-focus-within:w-full transition-all duration-500" />
                </div>
                <div className="relative border-b border-foreground/8 group">
                  <label
                    htmlFor="contact-email"
                    className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold pointer-events-none"
                  >
                    {FORM.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent pt-10 pb-4 text-base text-foreground outline-none border-none placeholder:text-foreground/15 focus:placeholder:text-foreground/25 transition-colors"
                    placeholder={FORM.emailPlaceholder}
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-focus-within:w-full transition-all duration-500" />
                </div>
              </div>

              <div className="relative border-b border-foreground/8 group">
                <label
                  htmlFor="contact-message"
                  className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold pointer-events-none"
                >
                  {FORM.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent pt-10 pb-4 text-base text-foreground outline-none border-none resize-none placeholder:text-foreground/15 focus:placeholder:text-foreground/25 transition-colors"
                  placeholder={FORM.messagePlaceholder}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-focus-within:w-full transition-all duration-500" />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="group flex items-center gap-3 text-sm font-semibold tracking-wider uppercase border border-foreground/10 hover:border-primary hover:bg-primary hover:text-background rounded-full px-8 py-4 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {formStatus === "sending"
                      ? "Opening mail..."
                      : formStatus === "sent"
                        ? "Mail client opened!"
                        : FORM.submitLabel}
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="border-t border-foreground/5">
        <div className="footer-content opacity-0 max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {FOOTER.copyright}
          </p>
          <p className="text-xs text-muted/50">
            {FOOTER.tagline}
          </p>
        </div>
      </footer>
    </section>
  );
}
