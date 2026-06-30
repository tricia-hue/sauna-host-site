"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution";

/**
 * Invisible component mounted once in the root layout.
 * Records first-touch attribution (utm_*, click IDs, referrer, landing page)
 * on the visitor's first page load.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureFirstTouch();
  }, []);
  return null;
}
