'use client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
import LoginForm from './LoginForm';
import PortalButton from '../portal/PortalButton';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [stripeCustomer, setStripeCustomer] = useState<any>(null);

  useEffect(function getUser() {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: stripeCustomerData, error } = await supabase
          .from('stripe_customers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.log('No stripe customer data found');
        } else {
          setStripeCustomer(stripeCustomerData);
        }
      }
    };
    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session) {
          setUser(session.user);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setStripeCustomer(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      {user ? (
        <>
          <p>
            Signed in with email: <strong>{user.email}</strong>
          </p>
          <p>
            Supabase User ID: <strong>{user.id}</strong>
          </p>
          <div>
            <button className="btn btn-secondary btn-sm my-3" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <h2>Stripe Customer Data</h2>
          {stripeCustomer ? (
            <>
              <p>This data lives in the stripe_customers table in Supabase</p>
              <div className="mockup-code">
                <pre>
                  <code>{JSON.stringify(stripeCustomer, null, 2)}</code>
                </pre>
              </div>
              <PortalButton />
            </>
          ) : (
            <div>
              <p className="text-yellow-500">Stripe customer data not created yet. Buy a plan!</p>
            </div>
          )}
        </>
      ) : (
        <>
          <p>No user logged in.</p>
          <LoginForm />
        </>
      )}
    </div>
  );
}
