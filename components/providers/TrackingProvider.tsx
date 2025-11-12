'use client';

import { useEffect } from 'react';
import { initializeTracking, trackPageView } from '@/lib/tracking';

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize tracking pixels
    initializeTracking();

    // Track initial page view
    trackPageView();
  }, []);

  return <>{children}</>;
}
