import { LeadFormData, NewsletterFormData } from '@/types';
import { config } from './config';
import { trackLead } from './tracking';

export interface MailerLiteResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Subscribe to newsletter
export const subscribeToNewsletter = async (
  data: NewsletterFormData
): Promise<MailerLiteResponse> => {
  try {
    const response = await fetch(config.mailerliteWorkerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        projectId: config.project.projectId,
        type: 'newsletter',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    const result = await response.json();

    // Track as lead
    trackLead({ email: data.email });

    return {
      success: true,
      message: result.message || 'Successfully subscribed!',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Submit lead form
export const submitLeadForm = async (data: LeadFormData): Promise<MailerLiteResponse> => {
  try {
    if (!data.consent) {
      return {
        success: false,
        error: 'Consent is required',
      };
    }

    const response = await fetch(config.mailerliteWorkerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        phone: data.phone,
        projectId: config.project.projectId,
        type: 'lead',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const result = await response.json();

    // Track as lead
    trackLead({
      email: data.email,
      firstName: data.firstName,
      phone: data.phone,
    });

    return {
      success: true,
      message: result.message || 'Thank you for your interest!',
    };
  } catch (error) {
    console.error('Lead form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
