import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AttributionTracker from "@/components/AttributionTracker";

const FB_PIXEL_ID = "773318260918877";

// Pinterest tag. Set NEXT_PUBLIC_PINTEREST_TAG_ID in Vercel once the Pinterest
// conversion tag exists (Pinterest → Ads → Conversions). Until it's set, the
// tag is not injected, so nothing breaks.
const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

// thesaunahost.com is the canonical, indexable home for the course.
const siteUrl = "https://thesaunahost.com";
const pagePath = "";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  title: "The Sauna Host — A free 5-day mini course from Revivery",
  description:
    "Become the host your friends will remember. A free 5-day mini course on hosting a sauna and cold plunge gathering — women's circle, men's gathering, milestone celebration, or book club.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "The Sauna Host — A free 5-day mini course",
    description:
      "A free 5-day mini course from Revivery on hosting a sauna and cold plunge gathering.",
    url: pageUrl,
    siteName: "Revivery",
    images: [
      {
        url: `${pageUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "The Sauna Host — Revivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sauna Host — A free 5-day mini course",
    description:
      "A free 5-day mini course from Revivery on hosting a sauna and cold plunge gathering.",
    images: [`${pageUrl}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// JSON-LD structured data — Course schema improves discoverability
const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "The Sauna Host",
  url: "https://thesaunahost.com",
  description:
    "A free 5-day mini course on hosting a sauna and cold plunge gathering. Learn to host a women's circle, men's gathering, milestone celebration, or book club using the Bio/Psych/Social Method from Revivery Instructor Training.",
  provider: {
    "@type": "Organization",
    name: "Revivery",
    url: "https://revivery.com",
    sameAs: ["https://revivery.co/instructor-training"],
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    category: "Free",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT2H30M",
  },
  educationalLevel: "Beginner",
  inLanguage: "en-US",
  isAccessibleForFree: true,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Revivery",
  url: "https://revivery.com",
  logo: "https://revivery.com/logo.png",
  sameAs: [
    "https://revivery.co/instructor-training",
    "https://www.instagram.com/reviverytampa",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {PINTEREST_TAG_ID && (
          <>
            <Script id="pinterest-tag" strategy="afterInteractive">
              {`
                !function(e){if(!window.pintrk){window.pintrk=function(){
                window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                pintrk('load', '${PINTEREST_TAG_ID}');
                pintrk('page');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://ct.pinterest.com/v3/?event=init&tid=${PINTEREST_TAG_ID}&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <AttributionTracker />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
