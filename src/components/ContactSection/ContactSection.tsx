"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";

interface ContactSectionProps {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  email: string;
  socials: { label: string; href: string }[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
  footer: {
    copyright: string;
    tagline: string;
  };
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactSection({
  sectionTitle,
  sectionNumber,
  headline,
  email,
  socials: SOCIALS,
  form: FORM,
  footer: FOOTER,
}: ContactSectionProps) {
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
    <section id="contact" ref={sectionRef}>
      <div className="ambient-glow glow-ambient" />

      <div>
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div>
          <div className="contact-headline">
            <h3>
              <div>
                <span>{headline[0]}</span>
              </div>
              <div>
                <span>
                  {headline[1].split(" ").slice(0, -1).join(" ")}{" "}
                  <span>
                    {headline[1].split(" ").at(-1)}
                  </span>
                </span>
              </div>
              <div>
                <span>{headline[2]}</span>
              </div>
            </h3>

            <div>
              <a href={`mailto:${email}`}>
                {email}
              </a>
              <div>
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                    <ArrowUpRight />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="contact-name">
                    {FORM.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder={FORM.namePlaceholder}
                  />
                  <div />
                </div>
                <div>
                  <label htmlFor="contact-email">
                    {FORM.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder={FORM.emailPlaceholder}
                  />
                  <div />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message">
                  {FORM.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder={FORM.messagePlaceholder}
                />
                <div />
              </div>

              <div>
                <button type="submit" disabled={formStatus === "sending"}>
                  <span>
                    {formStatus === "sending"
                      ? "Opening mail..."
                      : formStatus === "sent"
                        ? "Mail client opened!"
                        : FORM.submitLabel}
                  </span>
                  <ArrowUpRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {FOOTER.copyright}
          </p>
          <p>
            {FOOTER.tagline}
          </p>
        </div>
      </footer>
    </section>
  );
}
