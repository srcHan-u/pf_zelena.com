"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function useFacebookPixel() {
  const trackEvent = useCallback(
    (eventName: string, parameters?: Record<string, unknown>) => {
      if (typeof window !== "undefined" && window.fbq) {
        if (parameters) {
          window.fbq("track", eventName, parameters);
        } else {
          window.fbq("track", eventName);
        }
      }
    },
    []
  );

  const trackCustomEvent = useCallback(
    (eventName: string, parameters?: Record<string, unknown>) => {
      if (typeof window !== "undefined" && window.fbq) {
        if (parameters) {
          window.fbq("trackCustom", eventName, parameters);
        } else {
          window.fbq("trackCustom", eventName);
        }
      }
    },
    []
  );

  const trackPageView = useCallback(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);

  const trackLead = useCallback(
    (parameters?: Record<string, unknown>) => {
      trackEvent("Lead", parameters);
    },
    [trackEvent]
  );

  const trackContact = useCallback(
    (parameters?: Record<string, unknown>) => {
      trackEvent("Contact", parameters);
    },
    [trackEvent]
  );

  const trackPurchase = useCallback(
    (value?: number, currency = "USD") => {
      trackEvent("Purchase", { value, currency });
    },
    [trackEvent]
  );

  const trackAddToCart = useCallback(
    (value?: number, currency = "USD") => {
      trackEvent("AddToCart", { value, currency });
    },
    [trackEvent]
  );

  const trackInitiateCheckout = useCallback(
    (value?: number, currency = "USD") => {
      trackEvent("InitiateCheckout", { value, currency });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackCustomEvent,
    trackPageView,
    trackLead,
    trackContact,
    trackPurchase,
    trackAddToCart,
    trackInitiateCheckout,
  };
}
