/**
 * First-touch marketing attribution.
 *
 * Captures utm_* params, click IDs, referrer, and landing page the FIRST time a
 * visitor lands, and stashes them in localStorage so they survive navigation
 * (e.g. land on /lesson-1 from Instagram, then sign up on the homepage).
 *
 * readAttribution() is called by OptInForm at submit time and the values are
 * sent to /api/subscribe → Brevo, so each contact records where they came from.
 */

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
};

const STORAGE_KEY = "sh_attribution";

const SOCIAL_SOURCES = new Set([
  "pinterest",
  "instagram",
  "facebook",
  "tiktok",
  "twitter",
  "youtube",
  "linkedin",
  "threads",
  "reddit",
]);

/**
 * Map a referrer hostname to a canonical source label so untagged organic
 * traffic (e.g. a Pinterest pin or the website link on a Pinterest profile,
 * which carry no UTMs) is still attributed.
 */
function sourceFromHost(host: string): string {
  const h = host.replace(/^www\./, "").toLowerCase();
  if (h.includes("pinterest") || h === "pin.it") return "pinterest";
  if (h.includes("instagram")) return "instagram";
  if (h.includes("facebook") || h === "fb.com" || h.endsWith("fb.me")) return "facebook";
  if (h.includes("tiktok")) return "tiktok";
  if (h === "t.co" || h.includes("twitter") || h === "x.com") return "twitter";
  if (h.includes("youtube") || h === "youtu.be") return "youtube";
  if (h.includes("linkedin") || h === "lnkd.in") return "linkedin";
  if (h.includes("google")) return "google";
  if (h.includes("bing")) return "bing";
  return h; // bare domain as a generic referral source
}

function mediumForSource(source: string): string {
  return SOCIAL_SOURCES.has(source) ? "social" : "referral";
}

/**
 * Run once on first page load (see AttributionTracker). Does nothing if
 * attribution was already captured this browser, preserving first-touch.
 */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k) || undefined;

    // Treat common click IDs as the source when no explicit utm_source is present.
    // epik = Pinterest's outbound-click identifier.
    const clickIdSource = params.get("gclid")
      ? "google"
      : params.get("fbclid")
        ? "facebook"
        : params.get("ttclid")
          ? "tiktok"
          : params.get("epik")
            ? "pinterest"
            : undefined;

    // Only record an external referrer (ignore same-site navigation), and infer
    // a source from its domain so untagged organic traffic (e.g. a Pinterest pin
    // or profile link with no UTMs) is still attributed.
    let referrer: string | undefined;
    let referrerSource: string | undefined;
    if (document.referrer) {
      try {
        const refHost = new URL(document.referrer).hostname;
        if (refHost && refHost !== window.location.hostname) {
          referrer = document.referrer;
          referrerSource = sourceFromHost(refHost);
        }
      } catch {
        /* malformed referrer — ignore */
      }
    }

    const data: Attribution = {
      utmSource: get("utm_source") || clickIdSource || referrerSource,
      utmMedium:
        get("utm_medium") ||
        (referrerSource ? mediumForSource(referrerSource) : undefined),
      utmCampaign: get("utm_campaign"),
      utmTerm: get("utm_term"),
      utmContent: get("utm_content"),
      referrer,
      landingPage: window.location.pathname,
    };

    // Don't store an all-empty object — leaves room to capture a later, richer touch.
    const hasSignal = Object.values(data).some(Boolean);
    if (hasSignal) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    /* localStorage blocked (private mode etc.) — attribution is best-effort */
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
