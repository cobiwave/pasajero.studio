"use client";

import { useActionState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import content from "@/lib/content";
import { submitJoinRequest, type JoinRequestState } from "@/app/directory/joinAction";

const {
  sectionTitle,
  sectionNumber,
  headline,
  intro,
  disciplines: DISCIPLINES,
  form: FORM,
} = content.directory.joinForm;

const initialState: JoinRequestState = { status: "idle" };

export default function JoinSection() {
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
    <section
      id="join"
      ref={sectionRef}
      className="relative pt-32 md:pt-48 pb-32 md:pb-48 overflow-hidden"
    >
      <div className="ambient-glow glow-ambient top-0 right-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title={sectionTitle} number={sectionNumber} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-6 join-headline">
            <h3 className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter leading-[0.95] overflow-hidden">
              {headline.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="inline-block">
                    {i === headline.length - 1 ? (
                      <>
                        {line.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="font-serif italic font-light text-primary">
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

            <p className="mt-8 text-sm md:text-base text-muted leading-relaxed max-w-sm">
              {intro}
            </p>
          </div>

          <div className="lg:col-span-6">
            <form
              ref={formRef}
              action={formAction}
              className="join-form opacity-0 flex flex-col gap-0 border-t border-foreground/8"
            >
              <div
                className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="join-website">Dejar en blanco</label>
                <input
                  id="join-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="relative border-b border-foreground/8 group">
                <label
                  htmlFor="join-name"
                  className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold pointer-events-none"
                >
                  {FORM.nameLabel}
                </label>
                <input
                  id="join-name"
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent pt-10 pb-4 text-base text-foreground outline-none border-none placeholder:text-foreground/15 focus:placeholder:text-foreground/25 transition-colors"
                  placeholder={FORM.namePlaceholder}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-focus-within:w-full transition-all duration-500" />
              </div>

              <div className="py-8 border-b border-foreground/8">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-semibold mb-4">
                  {FORM.disciplinesLabel}
                </span>
                <div
                  role="group"
                  aria-label={FORM.disciplinesLabel}
                  className="flex flex-wrap gap-2"
                >
                  {DISCIPLINES.map((discipline) => (
                    <label key={discipline} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="disciplines"
                        value={discipline}
                        className="peer sr-only"
                      />
                      <span className="inline-block text-xs uppercase tracking-[0.15em] rounded-full px-4 py-2 border border-foreground/10 text-foreground/50 transition-colors duration-300 hover:border-foreground/30 hover:text-foreground peer-checked:border-primary peer-checked:bg-primary peer-checked:text-background peer-checked:font-semibold">
                        {discipline}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative border-b border-foreground/8 group">
                <label
                  htmlFor="join-contact"
                  className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-muted font-semibold pointer-events-none"
                >
                  {FORM.contactLabel}
                </label>
                <input
                  id="join-contact"
                  type="text"
                  name="contact"
                  required
                  className="w-full bg-transparent pt-10 pb-4 text-base text-foreground outline-none border-none placeholder:text-foreground/15 focus:placeholder:text-foreground/25 transition-colors"
                  placeholder={FORM.contactPlaceholder}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-focus-within:w-full transition-all duration-500" />
              </div>

              <div className="pt-8 flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex items-center gap-3 w-fit text-sm font-semibold tracking-wider uppercase border border-foreground/10 hover:border-primary hover:bg-primary hover:text-background rounded-full px-8 py-4 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {isPending ? FORM.sendingLabel : FORM.submitLabel}
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>

                {state.status === "success" && (
                  <p role="status" className="text-sm text-primary">
                    {FORM.successMessage}
                  </p>
                )}
                {state.status === "error" && (
                  <p role="alert" className="text-sm text-red-400">
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
