"use client";

import { useActionState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import { submitJoinRequest, type JoinRequestState } from "@/app/(frontend)/directory/joinAction";
import styles from "./JoinSection.module.scss";

interface JoinSectionProps {
  sectionTitle: string;
  sectionNumber: string;
  headline: string[];
  intro: string;
  disciplines: string[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    disciplinesLabel: string;
    contactLabel: string;
    contactPlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}

const initialState: JoinRequestState = { status: "idle" };

export default function JoinSection({
  sectionTitle,
  sectionNumber,
  headline,
  intro,
  disciplines: DISCIPLINES,
  form: FORM,
}: JoinSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitJoinRequest,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".join-headline span", { y: "0%", rotateZ: 0 });
        gsap.set(".join-form", { opacity: 1 });
        return;
      }

      gsap.fromTo(
        ".join-headline span",
        { y: "110%", rotateZ: 3 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".join-headline",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".join-form",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".join-form",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="join" ref={sectionRef}>
      <div className="ambient-glow glow-ambient" />

      <div>
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div>
          <div className="join-headline">
            <h3>
              {headline.map((line, i) => (
                <div key={i}>
                  <span>
                    {i === headline.length - 1 ? (
                      <>
                        {line.split(" ").slice(0, -1).join(" ")}{" "}
                        <span>
                          {line.split(" ").at(-1)}
                        </span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </div>
              ))}
            </h3>

            <p>
              {intro}
            </p>
          </div>

          <div>
            <form ref={formRef} action={formAction} className="join-form">
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="join-website">Dejar en blanco</label>
                <input
                  id="join-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="join-name">
                  {FORM.nameLabel}
                </label>
                <input
                  id="join-name"
                  type="text"
                  name="name"
                  required
                  placeholder={FORM.namePlaceholder}
                />
                <div />
              </div>

              <div>
                <span>
                  {FORM.disciplinesLabel}
                </span>
                <div role="group" aria-label={FORM.disciplinesLabel}>
                  {DISCIPLINES.map((discipline) => (
                    <label key={discipline}>
                      <input
                        type="checkbox"
                        name="disciplines"
                        value={discipline}
                      />
                      <span>
                        {discipline}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="join-contact">
                  {FORM.contactLabel}
                </label>
                <input
                  id="join-contact"
                  type="text"
                  name="contact"
                  required
                  placeholder={FORM.contactPlaceholder}
                />
                <div />
              </div>

              <div>
                <button type="submit" disabled={isPending}>
                  <span>
                    {isPending ? FORM.sendingLabel : FORM.submitLabel}
                  </span>
                  <ArrowUpRight />
                </button>

                {state.status === "success" && (
                  <p role="status">
                    {FORM.successMessage}
                  </p>
                )}
                {state.status === "error" && (
                  <p role="alert">
                    {FORM.errorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
