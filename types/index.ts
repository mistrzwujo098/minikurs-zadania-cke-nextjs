// Project Types
export interface ProjectConfig {
  projectId: string;
  projectName: string;
  targetAudience: string;
  price: {
    current: number;
    original: number;
    currency: string;
  };
  checkoutUrl: string;
}

// Tracking Types
export interface TrackingConfig {
  facebookPixelId?: string;
  googleAdsId?: string;
  tiktokPixelId?: string;
  trackingWorkerUrl: string;
}

export interface TrackingEvent {
  eventName: 'PageView' | 'Lead' | 'InitiateCheckout' | 'Purchase';
  eventId: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
  customData?: Record<string, any>;
}

// Component Props
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface PricingOption {
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaUrl: string;
}

// Form Types
export interface LeadFormData {
  email: string;
  firstName?: string;
  phone?: string;
  consent: boolean;
}

export interface NewsletterFormData {
  email: string;
}

// Animation Variants
export interface AnimationVariant {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string | number[];
    };
  };
}
