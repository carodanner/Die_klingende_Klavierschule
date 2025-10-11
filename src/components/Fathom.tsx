"use client";

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const FATHOM_ENABLED = process.env.NEXT_PUBLIC_FATHOM_ENABLED === "true";
const FATHOM_ID = process.env.NEXT_PUBLIC_FATHOM_ID;

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    if (!FATHOM_ENABLED || !FATHOM_ID) return;

    load(FATHOM_ID, {
      auto: false,
    });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    if (!FATHOM_ENABLED || !FATHOM_ID) return;
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams?.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
