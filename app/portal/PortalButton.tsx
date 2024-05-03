'use client';

import { createPortalSession } from './portalAction';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';

export default function PortalButton() {
  const handleClick = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw 'Please log in to manage your billing.';
      }

      const { data: customer, error: fetchError } = await supabase
        .from('stripe_customers')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();
      if (fetchError) throw new Error(fetchError.message);

      const { url } = await createPortalSession(customer?.stripe_customer_id);

      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast.error('Failed to create billing portal session:');
    }
  };

  return (
    <>
      <hr />
      <h2 className="text-center">Billing</h2>
      <p className="text-center">Manage your billing information.</p>
      <button className="btn btn-outline btn-primary mx-auto my-3 flex" onClick={handleClick}>
        Manage Billing
      </button>
    </>
  );
}
