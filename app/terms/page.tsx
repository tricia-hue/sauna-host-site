import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Use — The Sauna Host",
  description:
    "The terms that govern your use of The Sauna Host free mini course from Revivery.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const lastUpdated = "April 2026";

  return (
    <div className="pt-32 pb-section">
      <div className="container-sauna max-w-3xl">
        <p className="eyebrow mb-6">Terms of Use</p>
        <h1 className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-6">
          The fine print,<br />kept short.
        </h1>
        <p className="text-peach/60 text-sm mb-12">Last updated {lastUpdated}</p>

        <div className="prose-sauna space-y-8 text-peach/80 leading-relaxed">
          <p className="text-lg">
            By using The Sauna Host — this website and the accompanying email
            course and workbook — you agree to these terms. Revivery is the
            operator of this course.
          </p>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              The course is for personal use
            </h2>
            <p>
              We grant you a personal, non-transferable license to use The Sauna
              Host to host gatherings with friends and community. You may not
              resell, re-distribute, or teach this material as your own. If you
              want to use this professionally, we offer the full Revivery
              Instructor Training — that's the right path.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Safety first
            </h2>
            <p>
              Sauna, cold plunge, and breathwork are powerful practices. They
              are not appropriate for everyone. Before hosting or participating,
              each guest should consult their own medical provider. People who
              are pregnant, who have cardiovascular conditions, who are under
              the influence of alcohol or drugs, or who have other relevant
              conditions should not participate without medical clearance.
            </p>
            <p>
              Never practice breath-holding in or near water. Never practice
              hyperventilation breathwork while in the cold plunge.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              No medical or therapeutic advice
            </h2>
            <p>
              The Sauna Host is educational and experiential. It is not medical
              advice, psychological treatment, or a substitute for professional
              care. If you or a guest is working through trauma, a medical
              condition, or a mental health crisis, please work with a licensed
              professional.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              You host at your own risk
            </h2>
            <p>
              You are responsible for the safety of the space you host in and
              the people you invite. To the maximum extent permitted by law,
              Revivery is not liable for injury, illness, loss, or damage
              arising from your use of the material in this course or from any
              gathering you host.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Intellectual property
            </h2>
            <p>
              All course content — lessons, the workbook, scripts, and the
              Bio/Psych/Social Method framing — is the intellectual property of
              Revivery. You may use it with your guests. You may not reproduce
              or publish it elsewhere.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Changes
            </h2>
            <p>
              We may update these terms over time. The current version will
              always live at this URL with an updated "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of the State of Florida,
              without regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Contact
            </h2>
            <p>
              Questions? Email us at{" "}
              <a
                href={`mailto:${site.replyTo}`}
                className="text-gold hover:text-gold-light"
              >
                {site.replyTo}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-peach/10 flex gap-6 text-sm">
          <Link
            href="/"
            className="text-peach/60 hover:text-peach transition-colors"
          >
            ← Back to The Sauna Host
          </Link>
          <Link
            href="/privacy"
            className="text-peach/60 hover:text-peach transition-colors"
          >
            Privacy →
          </Link>
        </div>
      </div>
    </div>
  );
}
