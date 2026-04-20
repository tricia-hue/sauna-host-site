import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy — The Sauna Host",
  description:
    "How Revivery collects, uses, and protects information shared through The Sauna Host free mini course.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = "April 2026";

  return (
    <div className="pt-32 pb-section">
      <div className="container-sauna max-w-3xl">
        <p className="eyebrow mb-6">Privacy Policy</p>
        <h1 className="font-display text-display-md uppercase tracking-heading text-peach leading-[1.1] mb-6">
          How we handle<br />your information.
        </h1>
        <p className="text-peach/60 text-sm mb-12">Last updated {lastUpdated}</p>

        <div className="prose-sauna space-y-8 text-peach/80 leading-relaxed">
          <p className="text-lg">
            Revivery operates The Sauna Host — a free 5-day mini course on
            hosting a sauna and cold plunge gathering. This policy explains what
            we collect when you use it and how we use that information.
          </p>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              What we collect
            </h2>
            <p>
              When you opt in to The Sauna Host, we collect your email address
              and (optionally) your first name. We also use a cookie
              (<code className="text-gold text-sm">{site.cookieName}</code>) to
              remember that you have unlocked the gated lessons. We do not
              collect payment information anywhere in this course.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              How we use it
            </h2>
            <p>
              We use your email to deliver the 5-day course, the companion
              workbook, and periodic follow-up messages about Revivery programs
              — including our full Revivery Instructor Training. We do not sell
              or rent your information to anyone.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Service providers
            </h2>
            <p>
              We use Mailchimp to send course emails, Vercel to host this site,
              and standard analytics tools to understand how the course is used.
              These providers are bound by their own privacy commitments and
              only process data on our behalf.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Your choices
            </h2>
            <p>
              Every email we send includes an unsubscribe link. You can
              unsubscribe at any time and we will stop sending you emails. You
              can also email us at{" "}
              <a
                href={`mailto:${site.replyTo}`}
                className="text-gold hover:text-peach"
              >
                {site.replyTo}
              </a>{" "}
              to request that we delete your information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Cookies
            </h2>
            <p>
              We use one functional cookie — <code className="text-gold text-sm">{site.cookieName}</code> — to remember
              that you have unlocked the gated lessons. You can clear it at any
              time from your browser settings; doing so will simply require you
              to re-enter your email to unlock the lessons again.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Children
            </h2>
            <p>
              The Sauna Host is intended for adults. We do not knowingly collect
              information from anyone under 16.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase tracking-heading text-peach mb-3">
              Changes
            </h2>
            <p>
              If we make material changes to this policy we will post the
              updated version here and update the "last updated" date at the
              top.
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
                className="text-gold hover:text-peach"
              >
                {site.replyTo}
              </a>
              . We're based in Tampa, FL.
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
            href="/terms"
            className="text-peach/60 hover:text-peach transition-colors"
          >
            Terms →
          </Link>
        </div>
      </div>
    </div>
  );
}
