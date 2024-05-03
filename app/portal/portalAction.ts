'use server';

import { stripe } from '@/utils/stripe';

export async function createPortalSession(customerId: string) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  });

  return { id: portalSession.id, url: portalSession.url };
}
