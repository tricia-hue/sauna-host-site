import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import OptInForm from "@/components/OptInForm";
import { hostThemes, getHostTheme } from "@/content/themes";
import { site } from "@/lib/config";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return hostThemes.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const theme = getHostTheme(params.slug);
  if (!theme) return {};

  const url = `${site.url}/host/${theme.slug}`;
  return {
    title: `${theme.seoTitle} | The Sauna Host`,
    description: theme.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: theme.seoTitle,
      description: theme.seoDescription,
      url,
      siteName: "Revivery",
      type: "article",
      images: [{ url: `${site.url}${theme.image}`, alt: theme.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: theme.seoTitle,
      description: theme.seoDescription,
      images: [`${site.url}${theme.image}`],
    },
  };
}

export default function ThemePage({ params }: Props) {
  const theme = getHostTheme(params.slug);
  if (!theme) notFound();

  const others = hostThemes.filter((t) => t.slug !== theme.slug);
  const url = `${site.url}/host/${theme.slug}`;

  // HowTo describes the public flow only. Every step here is visible on the
  // page — we don't mark up anything that sits behind the email gate.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: theme.seoTitle,
    description: theme.seoDescription,
    url,
    totalTime: "PT90M",
    image: `${site.url}${theme.image}`,
    step: theme.flow.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.label,
      text: s.label,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "The Sauna Host", item: site.url },
      { "@type": "ListItem", position: 2, name: "Gatherings", item: `${site.url}/host` },
      { "@type": "ListItem", position: 3, name: theme.h1, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image
            src={theme.image}
            alt={theme.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-black via-blue-black/60 to-blue-black/30" />
        </div>

        <div className="container-sauna relative -mt-24 md:-mt-32 pb-4">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-peach/50">
              <li>
                <Link href="/" className="hover:text-peach transition-colors">
                  The Sauna Host
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/host" className="hover:text-peach transition-colors">
                  Gatherings
                </Link>
              </li>
            </ol>
          </nav>

          <p className="eyebrow mb-5">A Sauna Host gathering</p>
          <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-5">
            {theme.h1}
          </h1>
          <p className="text-gold/90 italic text-xl md:text-2xl mb-8">
            {theme.tagline}
          </p>

          <dl className="flex flex-wrap gap-x-12 gap-y-4 border-t border-peach/10 pt-6">
            <div>
              <dt className="eyebrow mb-1">Group size</dt>
              <dd className="text-peach/80">{theme.groupSize}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Length</dt>
              <dd className="text-peach/80">{theme.duration}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Breath pattern</dt>
              <dd className="text-peach/80">{theme.breathPattern}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Intro */}
      <section className="py-section">
        <div className="container-sauna max-w-prose-wide mx-auto">
          <div className="prose-sauna">
            {theme.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="pb-section">
        <div className="container-sauna max-w-prose-wide mx-auto">
          <p className="eyebrow mb-4">Why it works</p>
          <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-8">
            Heat, then cold, then honesty
          </h2>
          <div className="prose-sauna">
            {theme.why.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* The flow */}
      <section className="pb-section border-t border-peach/10 pt-section">
        <div className="container-sauna max-w-prose-wide mx-auto">
          <p className="eyebrow mb-4">The plan</p>
          <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-4">
            Your 90-minute flow
          </h2>
          <p className="text-peach/60 mb-12 max-w-xl leading-relaxed">
            This is the whole shape of the evening, start to finish. It's the
            same structure a trained Revivery lead runs in the studio, sized for
            a home sauna and {theme.groupSize.toLowerCase()}.
          </p>

          <ol className="space-y-0">
            {theme.flow.map((step, i) => (
              <li
                key={i}
                className="flex gap-6 md:gap-10 py-5 border-t border-peach/10 last:border-b"
              >
                <span className="font-display text-gold text-sm tracking-heading pt-1 w-16 shrink-0 tabular-nums">
                  {step.time}
                </span>
                <span className="text-peach/85 leading-relaxed">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prompts preview */}
      <section className="pb-section">
        <div className="container-sauna max-w-prose-wide mx-auto">
          <p className="eyebrow mb-4">The conversation</p>
          <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-8">
            Three of the {theme.promptCount} prompts
          </h2>
          <p className="text-peach/60 mb-10 max-w-xl leading-relaxed">
            The prompts are what turn a sauna session into a gathering. You ask
            one, everyone answers, nobody responds to anyone else's answer.
            Here are three of the {theme.promptCount} written for this theme.
          </p>

          <ol className="space-y-6">
            {theme.previewPrompts.map((prompt, i) => (
              <li key={i} className="flex gap-6">
                <span className="font-display text-gold text-sm tracking-heading pt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-peach/90 text-lg leading-relaxed italic">
                  {prompt}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-12 pt-8 border-t border-peach/10">
            <p className="eyebrow mb-3">Playlist seed</p>
            <p className="text-peach/70 leading-relaxed">{theme.playlist}</p>
          </div>
        </div>
      </section>

      {/* The gate */}
      <section id="unlock" className="pb-section scroll-mt-24">
        <div className="container-sauna max-w-3xl mx-auto">
          <div className="border border-gold/30 bg-gold/[0.04] p-10 md:p-14">
            <p className="eyebrow mb-6">The rest of the plan</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-8">
              Get the full {theme.name.toLowerCase()} plan, free
            </h2>
            <p className="text-peach/70 leading-relaxed mb-8 max-w-xl">
              You have the flow. The parts that make it land are in the free
              5-day course and the workbook that comes with it:
            </p>

            <ul className="space-y-3 mb-10 max-w-xl">
              {[
                `All ${theme.promptCount} conversation prompts for this theme`,
                "The invitation script to copy into your group text",
                "The four-sentence arrival script that sets the room in 90 seconds",
                "What to say in the 60 seconds after the plunge",
                "The message to send the group the morning after",
                "The 26-page printable workbook",
              ].map((item) => (
                <li
                  key={item}
                  className="text-peach/85 pl-6 relative leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 w-2 h-px bg-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <OptInForm
              source={`theme-${theme.slug}`}
              variant="inline"
              ctaLabel="Send me the course"
              microcopy="Free. Day 1 arrives the moment you sign up. Unsubscribe any time."
            />
          </div>
        </div>
      </section>

      {/* Other themes */}
      <section className="pb-section border-t border-peach/10 pt-section">
        <div className="container-sauna">
          <p className="eyebrow mb-4">Other gatherings</p>
          <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-12">
            One method, five nights
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/host/${other.slug}`}
                className="group block border border-peach/15 hover:border-gold transition-colors p-8"
              >
                <h3 className="font-display text-xl uppercase tracking-heading text-peach mb-3 group-hover:text-gold transition-colors">
                  {other.h1}
                </h3>
                <p className="text-peach/60 text-sm italic leading-relaxed">
                  {other.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
