import { ProjectConfig, TrackingConfig } from '@/types';

// Get environment variables with defaults
export const getProjectConfig = (): ProjectConfig => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'default-project';

  return {
    projectId,
    projectName: projectId,
    targetAudience: '',
    price: {
      current: 597,
      original: 1000,
      currency: 'PLN',
    },
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || '',
  };
};

export const getTrackingConfig = (): TrackingConfig => {
  return {
    facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
    trackingWorkerUrl: process.env.NEXT_PUBLIC_TRACKING_WORKER_URL || '',
  };
};

export const config = {
  project: getProjectConfig(),
  tracking: getTrackingConfig(),
  mailerliteWorkerUrl: process.env.NEXT_PUBLIC_MAILERLITE_WORKER_URL || '',
};
