import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OptInForm from "@/components/OptInForm";
import { hostThemes } from "@/content/themes";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Five Sauna Gatherings You Can Host | The Sauna Host",
  description:
    "Date night, book club, girls' night, men's night, or a birthday — hosted in the sauna and cold plunge. Each one comes with a 90-minute flow, conversation prompts, and a playlist.",
  alternates: { canonical: `${site.url}/host` },
  openGraph: {
    title: "Five Sauna Gatherings You Can Host",
    description:
      "Date night, book club, girls' night, men's night, or a birthday — hosted in the sauna and cold plunge, with the full 90-minute plan for each.",
    url: `${site.url}/host`,
    siteName: "Revivery",
    type: "website",
  },
};

export default function HostHubPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Five sauna gatherings you can host",
    itemListElement: hostThemes.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.h1,
      url: `${site.url}/host/${t.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="py-section">
        <div className="container-sauna">
          <div className="max-w-prose-wide">
            <p className="eyebrow mb-6">The gatherings</p>
            <h1 className="font-display text-display-lg uppercase tracking-heading text-peach leading-[1.05] mb-8">
              Five nights,
              <br />
              one method.
            </h1>
            <div className="prose-sauna">
              <p>
                A sauna and a cold plunge will do plenty on their own. What they
                won't do is turn an evening into something people still talk
                about in a month. That takes a plan.
              </p>
              <p>
                Each gathering below has the same bones — arrival, heat, cold,
                the sixty seconds after, and a close. What changes is who's in
                the room and what you ask them. Pick the one that gives you a
                little bit of &ldquo;oh no.&rdquo; That's usually the right one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna">
          <div className="grid md:grid-cols-2 gap-8">
            {hostThemes.map((theme, i) => (
              <Link
                key={theme.slug}
                href={`/host/${theme.slug}`}
                className={`group block overflow-hidden bg-blue-black/40 hover:bg-blue-black/60 transition-colors ${
                  i === hostThemes.length - 1 && hostThemes.length % 2 === 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === hostThemes.length - 1 && hostThemes.length % 2 === 1
                      ? "aspect-[21/9]"
                      : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={theme.image}
                    alt={theme.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-black via-blue-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 h-1 bg-gold w-0 group-hover:w-full transition-all duration-500" />
                </div>

                <div className="p-10 border-l-2 border-transparent group-hover:border-gold transition-colors">
                  <p className="eyebrow mb-5">
                    {theme.groupSize} &middot; {theme.duration}
                  </p>
                  <h2 className="font-display text-3xl uppercase tracking-heading text-peach mb-4 group-hover:text-gold transition-colors">
                    {theme.h1}
                  </h2>
                  <p className="text-gold/90 italic text-lg mb-4">
                    {theme.tagline}
                  </p>
                  <p className="text-peach/70 leading-relaxed max-w-md">
                    {theme.intro[0]}
                  </p>
                  <p className="mt-6 font-display text-xs uppercase tracking-display text-peach/50 group-hover:text-gold transition-colors">
                    See the full plan &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-sauna max-w-3xl mx-auto">
          <div className="border border-gold/30 bg-gold/[0.04] p-10 md:p-14 text-center">
            <p className="eyebrow mb-6">Start anywhere</p>
            <h2 className="font-display text-display-md uppercase tracking-heading text-peach leading-tight mb-6">
              The free 5-day course
            </h2>
            <p className="text-peach/70 leading-relaxed max-w-lg mx-auto mb-10">
              All five plans live in the workbook that comes with the course,
              along with the invitation scripts, the arrival script, and the
              prompts for every theme. It's free, and Day 1 arrives the moment
              you sign up.
            </p>
            <div className="flex justify-center">
              <OptInForm source="host-hub" variant="inline" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
