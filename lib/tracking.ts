import { TrackingEvent } from '@/types';
import { config } from './config';

// Generate unique event ID for deduplication
export const generateEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Send tracking event to Worker
export const trackEvent = async (event: Omit<TrackingEvent, 'eventId'>): Promise<void> => {
  const eventId = generateEventId();
  const trackingEvent: TrackingEvent = {
    ...event,
    eventId,
  };

  try {
    // Send to tracking worker
    if (config.tracking.trackingWorkerUrl) {
      await fetch(config.tracking.trackingWorkerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: config.project.projectId,
          ...trackingEvent,
        }),
      });
    }

    // Facebook Pixel
    if (config.tracking.facebookPixelId && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', event.eventName, event.customData || {}, {
        eventID: eventId,
      });
    }

    // Google Ads
    if (config.tracking.googleAdsId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.eventName, {
        send_to: config.tracking.googleAdsId,
        event_id: eventId,
        ...event.customData,
      });
    }

    // TikTok Pixel
    if (config.tracking.tiktokPixelId && typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track(event.eventName, {
        event_id: eventId,
        ...event.customData,
      });
    }
  } catch (error) {
    console.error('Tracking error:', error);
  }
};

// Track page view
export const trackPageView = (): void => {
  trackEvent({
    eventName: 'PageView',
    customData: {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      page_title: typeof document !== 'undefined' ? document.title : '',
    },
  });
};

// Track lead (form submission)
export const trackLead = (userData?: TrackingEvent['userData']): void => {
  trackEvent({
    eventName: 'Lead',
    userData,
    customData: {
      source: 'landing_page',
    },
  });
};

// Track checkout initiation
export const trackInitiateCheckout = (value?: number): void => {
  trackEvent({
    eventName: 'InitiateCheckout',
    customData: {
      value: value || config.project.price.current,
      currency: config.project.price.currency,
    },
  });
};

// Initialize tracking pixels
export const initializeTracking = (): void => {
  if (typeof window === 'undefined') return;

  // Facebook Pixel
  if (config.tracking.facebookPixelId) {
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    (window as any).fbq('init', config.tracking.facebookPixelId);
  }

  // Google Ads
  if (config.tracking.googleAdsId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.tracking.googleAdsId}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', config.tracking.googleAdsId);
  }

  // TikTok Pixel
  if (config.tracking.tiktokPixelId) {
    (function(w: any, d: any, t: any) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      (ttq.methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie',
      ]),
        (ttq.setAndDefer = function(t: any, e: any) {
          t[e] = function() {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        });
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function(t: any) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
          ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      };
      ttq.load = function(e: any, n: any) {
        var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        (ttq._i = ttq._i || {}),
          (ttq._i[e] = []),
          (ttq._i[e]._u = i),
          (ttq._t = ttq._t || {}),
          (ttq._t[e] = +new Date()),
          (ttq._o = ttq._o || {}),
          (ttq._o[e] = n || {});
        var o = document.createElement('script');
        (o.type = 'text/javascript'), (o.async = !0), (o.src = i + '?sdkid=' + e + '&lib=' + t);
        var a = document.getElementsByTagName('script')[0];
        a.parentNode!.insertBefore(o, a);
      };
      ttq.load(config.tracking.tiktokPixelId);
      ttq.page();
    })(window, document, 'ttq');
  }
};
