"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Script from "next/script";
import { SITE_CONFIG } from "@/config/site";

export const fbqTrack = (eventName: string, options?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    const testCode = SITE_CONFIG.facebookTestEventCode;
    if (testCode) {
      (window as any).fbq("track", eventName, options || {}, { test_event_code: testCode });
    } else {
      (window as any).fbq("track", eventName, options);
    }
  }
};

function FacebookPixelInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = SITE_CONFIG.facebookPixelId;
  const urlTestCode = searchParams?.get("test_event_code");
  const testCode = urlTestCode || SITE_CONFIG.facebookTestEventCode;

  useEffect(() => {
    if (!pixelId) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      if (testCode) {
        (window as any).fbq("track", "PageView", {}, { test_event_code: testCode });
      } else {
        (window as any).fbq("track", "PageView");
      }
    }
  }, [pathname, searchParams, pixelId, testCode]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          ${
            testCode
              ? `fbq('track', 'PageView', {}, { test_event_code: '${testCode}' });`
              : `fbq('track', 'PageView');`
          }
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1${
            testCode ? `&test_event_code=${testCode}` : ""
          }`}
          alt="facebook pixel"
        />
      </noscript>
    </>
  );
}

export default function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <FacebookPixelInner />
    </Suspense>
  );
}
