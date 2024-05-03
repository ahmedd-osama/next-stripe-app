'use client';

import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const { data } = await supabase.auth.getUser();
    console.log(data?.user);

    if (!data?.user) {
      toast.error('Please log in to be able to continue');
      return;
    }

    // loading stripe using the publishable key
    try {
      const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      const stripe = await stripePromise;
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: 'price_1PCD46Jd4CAlgb48e5wbLjD7',
            userId: data.user?.id,
            email: data.user?.email,
          }),
        });
        const session = await response.json();
        console.log(session);
        await stripe?.redirectToCheckout({ sessionId: session.id });
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while trying to create a new Stripe Checkout session');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while trying to load the stripe checkout');
    }
  };

  return (
    <div>
      <h1>Signup for a Plan</h1>
      <p>Clicking this button creates a new Stripe Checkout session</p>
      <button className="btn btn-accent" onClick={handleCheckout}>
        Buy Now
      </button>
    </div>
  );
}
