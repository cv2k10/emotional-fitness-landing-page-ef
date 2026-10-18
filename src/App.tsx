import { useEffect, useRef, useState, type FormEvent } from "react";

type DialogKind = "workshop" | "session" | "intro";

const challenges = [
  "You carry responsibility for others long after the working day ends.",
  "Switching off feels harder than getting things done.",
  "Decisions and conversations keep replaying in your mind.",
  "You hold a professional face, even when things feel heavy.",
  "The next achievement arrives, but fulfilment does not always follow.",
  "Under pressure, you want to respond with intention, not react on instinct.",
];

const benefits = [
  {
    number: "01",
    title: "Self-awareness",
    description:
      "Recognise emotional patterns and better understand what is driving your reactions.",
    icon: "awareness",
  },
  {
    number: "02",
    title: "Emotional resilience",
    description:
      "Meet pressure, uncertainty, and setbacks with more room to think and choose.",
    icon: "resilience",
  },
  {
    number: "03",
    title: "Intentional leadership",
    description:
      "Communicate more thoughtfully, make considered decisions, and build healthier relationships.",
    icon: "leadership",
  },
];

const faqs = [
  {
    question: "What is emotional fitness?",
    answer:
      "Emotional fitness is the capacity to notice what is happening within you, understand your patterns, and choose how you want to respond. It is a practical skill to develop over time, not a measure of whether you are doing well or badly.",
  },
  {
    question: "Who is the workshop designed for?",
    answer:
      "It is intended for entrepreneurs, business owners, executives, and professionals who carry responsibility and want a more intentional relationship with pressure, decisions, and the people around them. Final workshop details will be confirmed before registration opens.",
  },
  {
    question: "Do I need previous experience?",
    answer:
      "No previous experience with coaching or reflective practices is needed. The workshop is being shaped as an accessible introduction; confirmed format and content will be shared when registration opens.",
  },
  {
    question: "What happens during a one-to-one session?",
    answer:
      "A session offers confidential space to bring a current challenge, explore the patterns around it, and consider practical next steps. The length, fee, and booking arrangements are placeholders until confirmed.",
  },
  {
    question: "Is emotional fitness support the same as therapy?",
    answer:
      "No. Emotional fitness support is intended as developmental, educational support for reflection and skill-building. It is not psychotherapy, diagnosis, or mental health treatment, and it is not a replacement for care from a qualified clinician.",
  },
  {
    question: "How much time should I set aside to practise?",
    answer:
      "There is no fixed amount. Small, regular moments of reflection can fit around a busy working day. The right rhythm depends on your circumstances and the approach you choose to practise.",
  },
  {
    question: "What happens after I register for the workshop?",
    answer:
      "Registration is not open in this preview. Once dates, delivery, and pricing are confirmed, the registration process and what to expect next should be added here.",
  },
];

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5v12m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PillarIcon({ name }: { name: string }) {
  if (name === "awareness") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
        <path d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z" />
        <circle cx="24" cy="24" r="5.5" />
        <path d="M24 4v4m0 32v4M4 24h4m32 0h4" />
      </svg>
    );
  }
  if (name === "resilience") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
        <path d="M24 5 39 11v11c0 10-6.4 17-15 21C15.4 39 9 32 9 22V11l15-6Z" />
        <path d="M17 25.5 22 30l10-12" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="13" r="6" />
      <circle cx="11" cy="34" r="5" />
      <circle cx="37" cy="34" r="5" />
      <path d="M20.7 18 14 29m13.3-11L34 29M16 34h16" />
    </svg>
  );
}

function recordConversion(eventName: string) {
  // Analytics placeholder: connect this custom event to the chosen analytics provider.
  window.dispatchEvent(
    new CustomEvent("emotional-fitness:conversion", { detail: { eventName } }),
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideSubmitted, setGuideSubmitted] = useState(false);
  const [dialogKind, setDialogKind] = useState<DialogKind | null>(null);
  const [dialogSubmitted, setDialogSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialogKind && !dialog.open) dialog.showModal();
    if (!dialogKind && dialog.open) dialog.close();
  }, [dialogKind]);

  const openDialog = (kind: DialogKind) => {
    setDialogSubmitted(false);
    setDialogKind(kind);
    recordConversion(`${kind}_interest_open`);
  };

  const handleGuideSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuideSubmitted(true);
    recordConversion("lead_magnet_submit");
  };

  const handleDialogSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDialogSubmitted(true);
    if (dialogKind) recordConversion(`${dialogKind}_interest_submit`);
  };

  const closeMenu = () => setMenuOpen(false);

  const dialogContent = {
    workshop: {
      eyebrow: "INTRODUCTORY WORKSHOP",
      title: "Be first to hear when registration opens.",
      description:
        "The workshop date, format, and price are still being confirmed. Register your interest and the finished details can be shared when they are ready.",
      submit: "Register my interest",
    },
    session: {
      eyebrow: "ONE-TO-ONE SUPPORT",
      title: "Start a conversation about support.",
      description:
        "Session availability and the booking calendar are not connected yet. Share your details to request a conversation once those arrangements are confirmed.",
      submit: "Request a conversation",
    },
    intro: {
      eyebrow: "INTRODUCTORY CONVERSATION",
      title: "See whether the approach feels right for you.",
      description:
        "An optional introductory conversation can help you ask questions and understand the next step. Availability is to be confirmed.",
      submit: "Ask about an introduction",
    },
  };

  const activeDialog = dialogKind ? dialogContent[dialogKind] : null;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Emotional Fitness, home" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              E<span>/</span>F
            </span>
            <span className="brand-name">
              <span>Emotional</span>
              <span>Fitness</span>
            </span>
          </a>

          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>

          <nav
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            <a href="#approach" onClick={closeMenu}>
              The approach
            </a>
            <a href="#guide" onClick={closeMenu}>
              Free guide
            </a>
            <a href="#workshop" onClick={closeMenu}>
              Workshop
            </a>
            <a href="#support" onClick={closeMenu}>
              One-to-one
            </a>
            <a
              className="header-cta"
              href="#workshop"
              onClick={() => {
                closeMenu();
                recordConversion("workshop_header_cta");
              }}
            >
              Explore the workshop <ArrowRight />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-wash" aria-hidden="true" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span className="eyebrow-line" /> Emotional fitness for people who lead
              </p>
              <h1 id="hero-title">
                You&apos;ve built your success.
                <span>Now strengthen the person behind it.</span>
              </h1>
              <p className="hero-description">
                Emotional fitness helps high-achieving professionals navigate
                pressure, understand their emotional patterns, and build the
                inner resilience to lead and live with greater clarity.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href="#workshop"
                  onClick={() => recordConversion("workshop_hero_cta")}
                >
                  Explore the workshop <ArrowRight />
                </a>
                <a className="text-link hero-secondary" href="#approach">
                  Discover emotional fitness <ArrowDown />
                </a>
              </div>
              <p className="hero-note">
                <span aria-hidden="true">—</span> Practical tools for real-world
                challenges at work and in life.
              </p>
            </div>
          </div>
        </section>

        <section className="pressure-section section-pad" id="reality" aria-labelledby="pressure-title">
          <div className="page-width">
            <div className="section-intro pressure-intro" data-reveal>
              <div>
                <p className="eyebrow section-eyebrow">01 / The quiet weight of success</p>
                <h2 id="pressure-title">
                  Success on the outside doesn&apos;t always mean balance on the inside.
                </h2>
              </div>
              <p className="section-intro-copy">
                You can care deeply about the life you&apos;ve built and still feel
                the strain of carrying it. That tension deserves attention, not
                judgement.
              </p>
            </div>

            <div className="challenge-grid">
              {challenges.map((challenge, index) => (
                <div className="challenge-item" data-reveal key={challenge}>
                  <span className="challenge-number">0{index + 1}</span>
                  <p>{challenge}</p>
                  <span className="challenge-rule" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="approach-section section-pad" id="approach" aria-labelledby="approach-title">
          <div className="page-width">
            <div className="approach-heading" data-reveal>
              <p className="eyebrow section-eyebrow">02 / A skill for the whole self</p>
              <h2 id="approach-title">
                Train your emotional fitness like you train your professional skills.
              </h2>
              <p>
                Emotional fitness is the everyday capacity to notice what is
                happening within you, stay present through pressure, and choose
                how you want to respond. It is a practice, not a personality type.
              </p>
            </div>

            <div className="benefit-grid">
              {benefits.map((benefit) => (
                <article className="benefit-item" data-reveal key={benefit.number}>
                  <div className="benefit-topline">
                    <span>{benefit.number}</span>
                    <PillarIcon name={benefit.icon} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="guide-section section-pad" id="guide" aria-labelledby="guide-title">
          <div className="page-width guide-layout">
            <div className="guide-art-wrap" data-reveal>
              <div className="guide-art" aria-label="The High Achiever's Emotional Fitness Check-In guide cover">
                <div className="guide-art-top">
                  <span>E / F</span>
                  <span>FIELD NOTE 001</span>
                </div>
                <div className="guide-art-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="guide-art-title">
                  The high achiever&apos;s
                  <em>emotional fitness</em>
                  check-in
                </p>
                <div className="guide-art-bottom">
                  <span>REFLECTION GUIDE</span>
                  <span>01 — 04</span>
                </div>
              </div>
              <p className="guide-art-caption">A considered pause for a full life.</p>
            </div>

            <div className="guide-copy" data-reveal>
              <p className="eyebrow section-eyebrow">03 / A free reflection guide</p>
              <h2 id="guide-title">The High Achiever&apos;s Emotional Fitness Check-In</h2>
              <p className="guide-description">
                Discover the emotional patterns that may be influencing your
                energy, decisions, and relationships. Use this practical guide
                to reflect on where you are today and identify one area to strengthen.
              </p>
              <ul className="guide-includes">
                <li>A short self-reflection questionnaire</li>
                <li>Five prompts for recognising emotional patterns</li>
                <li>A simple daily emotional fitness exercise</li>
                <li>One practical next step</li>
              </ul>

              {!guideSubmitted ? (
                <form
                  className="guide-form"
                  onSubmit={handleGuideSubmit}
                  data-email-provider="connect-your-email-platform"
                  data-track="lead_magnet_submit"
                >
                  <div className="form-fields">
                    <label className="field-label">
                      First name
                      <input autoComplete="given-name" name="firstName" required />
                    </label>
                    <label className="field-label">
                      Email address
                      <input autoComplete="email" name="email" type="email" required />
                    </label>
                  </div>
                  <label className="consent-label">
                    <input name="emailConsent" type="checkbox" required />
                    <span>
                      Send me the guide and occasional emotional fitness notes. I
                      can unsubscribe at any time.
                    </span>
                  </label>
                  <button className="button button-dark" type="submit">
                    Get the free guide <ArrowRight />
                  </button>
                  <p className="privacy-reassurance">
                    Your details are treated with care. See the{" "}
                    <a href="#privacy">privacy note</a>.
                  </p>
                  <p className="prototype-note">
                    Preview only: this form does not store or email submissions.
                    Connect an email provider before launch.
                  </p>
                </form>
              ) : (
                <div className="guide-success" role="status" aria-live="polite">
                  <p className="guide-success-title">Your check-in is ready.</p>
                  <p>
                    Download the guide and take a few minutes to notice what is
                    asking for your attention.
                  </p>
                  <a
                    className="button button-dark"
                    href="/emotional-fitness-check-in.html"
                    download
                    onClick={() => recordConversion("lead_magnet_download")}
                  >
                    Download the free guide <ArrowRight />
                  </a>
                  <p className="prototype-note">
                    No details were saved or sent in this preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="workshop-section section-pad" id="workshop" aria-labelledby="workshop-title">
          <div className="page-width workshop-layout">
            <div className="workshop-copy" data-reveal>
              <p className="eyebrow section-eyebrow">04 / Start with a small step</p>
              <h2 id="workshop-title">
                Take your first practical step towards emotional fitness.
              </h2>
              <p className="workshop-description">
                An introductory workshop is a chance to experience the approach,
                explore where it meets your working life, and decide what feels
                useful to take forward.
              </p>
              <div className="outcomes-note">
                <span className="outcomes-note-number">A / B</span>
                <div>
                  <p>Learning outcomes</p>
                  <span>To be confirmed by the programme owner before registration opens.</span>
                </div>
              </div>
            </div>

            <aside className="workshop-panel" data-reveal aria-label="Introductory workshop details">
              <p className="eyebrow workshop-panel-eyebrow">INTRODUCTORY WORKSHOP</p>
              <h3>Workshop title <span>to be confirmed</span></h3>
              <p className="workshop-panel-copy">
                A welcoming, practical introduction to the emotional fitness approach.
              </p>
              <dl className="workshop-details">
                <div>
                  <dt>Duration</dt>
                  <dd>[Add duration]</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>[Online / in person]</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>[Date / on-demand]</dd>
                </div>
                <div>
                  <dt>Investment</dt>
                  <dd>[Price]</dd>
                </div>
              </dl>
              <button
                className="button button-primary workshop-button"
                type="button"
                onClick={() => openDialog("workshop")}
              >
                Register your interest <ArrowRight />
              </button>
              <p className="workshop-panel-footnote">
                Details are placeholders until confirmed. No price or date has been set.
              </p>
            </aside>
          </div>
        </section>

        <section className="support-section section-pad" id="support" aria-labelledby="support-title">
          <div className="page-width support-layout">
            <div className="support-copy" data-reveal>
              <p className="eyebrow section-eyebrow">05 / Personal, considered support</p>
              <h2 id="support-title">For when you&apos;re ready to go deeper.</h2>
              <p className="support-lead">
                If you&apos;d like personalised support in applying emotional
                fitness to your own challenges, a one-to-one session offers
                space to explore your goals, recognise patterns, and identify
                practical next steps.
              </p>
              <h3>What you can expect</h3>
              <ol className="session-steps">
                <li>
                  <span>01</span>
                  <p>Bring a current challenge or question that matters to you.</p>
                </li>
                <li>
                  <span>02</span>
                  <p>Explore what may be shaping your response, at your own pace.</p>
                </li>
                <li>
                  <span>03</span>
                  <p>Consider a practical next step that fits your real life.</p>
                </li>
              </ol>
            </div>

            <aside className="session-panel" data-reveal aria-label="One-to-one support details">
              <div className="session-panel-top">
                <span>PRIVATE / ONE-TO-ONE</span>
                <span className="session-panel-mark" aria-hidden="true">E/F</span>
              </div>
              <h3>A space to think clearly.</h3>
              <p>
                A confidential, professional conversation centred on your context,
                not a one-size-fits-all formula.
              </p>
              <dl className="session-details">
                <div>
                  <dt>Session</dt>
                  <dd>[Duration]</dd>
                </div>
                <div>
                  <dt>Investment</dt>
                  <dd>[Price]</dd>
                </div>
              </dl>
              <button
                className="button button-primary session-button"
                type="button"
                onClick={() => openDialog("session")}
              >
                Book a one-to-one session <ArrowRight />
              </button>
              <button className="session-intro-link" type="button" onClick={() => openDialog("intro")}>
                Ask about an introductory conversation <ArrowRight />
              </button>
              <p className="booking-placeholder">
                Calendar and booking link to be connected when availability is confirmed.
              </p>
            </aside>
          </div>
        </section>

        <section className="about-section section-pad" id="about" aria-labelledby="about-title">
          <div className="page-width about-layout">
            <div className="about-image-wrap" data-reveal>
              <img
                src="/images/guide-portrait-placeholder.jpg"
                alt="Temporary portrait placeholder for the emotional fitness guide"
                loading="lazy"
              />
              <p>Portrait shown as a placeholder; replace with the guide&apos;s approved image.</p>
            </div>
            <div className="about-copy" data-reveal>
              <p className="eyebrow section-eyebrow">06 / The person behind the practice</p>
              <h2 id="about-title">Meet your emotional fitness guide.</h2>
              <p className="about-name">[Guide name]</p>
              <p className="about-role">[Professional title / verified qualifications]</p>
              <div className="about-rule" aria-hidden="true" />
              <p className="about-placeholder">
                Add a warm introduction to the guide here: relevant professional
                background and verified experience, a personal philosophy, why
                emotional fitness matters to them, and how they work with people
                carrying significant responsibility.
              </p>
              <p className="about-reminder">
                Credentials and experience should be added only when confirmed by
                the business owner.
              </p>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
          <div className="page-width faq-layout">
            <div className="faq-heading" data-reveal>
              <p className="eyebrow section-eyebrow">07 / A few useful answers</p>
              <h2 id="faq-title">Good questions deserve clear answers.</h2>
              <p>
                If you are unsure whether this approach is right for you, start
                with the questions below.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details className="faq-item" data-reveal key={faq.question}>
                  <summary>
                    <span>{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="page-width closing-inner" data-reveal>
            <p className="eyebrow">The person behind the performance matters.</p>
            <h2 id="closing-title">Make space for a stronger inner life.</h2>
            <a
              className="button button-primary"
              href="#workshop"
              onClick={() => recordConversion("workshop_closing_cta")}
            >
              Explore the workshop <ArrowRight />
            </a>
          </div>
          <span className="closing-orbit closing-orbit-one" aria-hidden="true" />
          <span className="closing-orbit closing-orbit-two" aria-hidden="true" />
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <a className="brand footer-brand" href="#top" aria-label="Emotional Fitness, back to top">
            <span className="brand-mark" aria-hidden="true">
              E<span>/</span>F
            </span>
            <span className="brand-name">
              <span>Emotional</span>
              <span>Fitness</span>
            </span>
          </a>
          <p className="footer-signoff">A practice for people who lead.</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#approach">The approach</a>
            <a href="#guide">Free guide</a>
            <a href="#workshop">Workshop</a>
            <a href="#support">One-to-one</a>
            <a href="#faq">FAQs</a>
          </nav>
        </div>
        <div className="page-width footer-bottom">
          <p id="privacy">
            Privacy note: the preview forms do not collect or transmit data. Add an
            approved privacy policy and connect your chosen email, booking, and
            analytics providers before launch.
          </p>
          <p>
            Emotional fitness support is developmental and educational; it is not
            a substitute for therapy or medical care.
          </p>
          <span>© {new Date().getFullYear()} Emotional Fitness</span>
        </div>
      </footer>

      <dialog
        className="contact-dialog"
        ref={dialogRef}
        aria-labelledby="dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          setDialogKind(null);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setDialogKind(null);
        }}
        onClose={() => setDialogKind(null)}
      >
        {activeDialog && (
          <div className="dialog-content">
            <button
              className="dialog-close"
              type="button"
              aria-label="Close dialog"
              onClick={() => setDialogKind(null)}
            >
              <span />
              <span />
            </button>
            <p className="eyebrow section-eyebrow">{activeDialog.eyebrow}</p>
            <h2 id="dialog-title">{activeDialog.title}</h2>
            <p className="dialog-description">{activeDialog.description}</p>
            {!dialogSubmitted ? (
              <form
                className="dialog-form"
                onSubmit={handleDialogSubmit}
                data-email-provider="connect-your-email-platform"
                data-track={`${dialogKind}_interest_submit`}
              >
                <label className="field-label">
                  First name
                  <input autoComplete="given-name" name="firstName" required />
                </label>
                <label className="field-label">
                  Email address
                  <input autoComplete="email" name="email" type="email" required />
                </label>
                <label className="consent-label dialog-consent">
                  <input name="contactConsent" type="checkbox" required />
                  <span>I agree to be contacted about this request.</span>
                </label>
                <p className="prototype-note dialog-prototype-note">
                  Preview only: requests are not stored or sent. Connect a secure
                  form and booking provider before launch.
                </p>
                <button className="button button-dark" type="submit">
                  {activeDialog.submit} <ArrowRight />
                </button>
              </form>
            ) : (
              <div className="dialog-success" role="status" aria-live="polite">
                <p className="guide-success-title">Thank you for your interest.</p>
                <p>
                  This preview does not save or send your request. Connect the
                  approved form and booking provider to make this step live.
                </p>
                <button className="text-link dialog-return" type="button" onClick={() => setDialogKind(null)}>
                  Return to the page <ArrowRight />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}