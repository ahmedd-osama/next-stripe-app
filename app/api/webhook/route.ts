import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { supabaseAdmin } from '@/utils/supabaseServer';
import Stripe from 'stripe';
import chalk from 'chalk';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    console.log(chalk.blue.bgWhite.bold(event.type));

    if (event.type === 'checkout.session.completed') {
      const session: Stripe.Checkout.Session = event.data.object;
      const userId = session.metadata?.user_id;
      console.log({
        user_id: userId,
        stripe_customer_id: session.customer,
        subscription_id: session.subscription,
        plan_active: true,
        plan_expires: null,
      });

      // Create or update the stripe_customer_id in the stripe_customers table
      const { error, data } = await supabaseAdmin.from('stripe_customers').upsert({
        user_id: userId,
        stripe_customer_id: session.customer,
        subscription_id: session.subscription,
        plan_active: true,
        plan_expires: null,
      });
      if (error) {
        console.error(chalk.red(error.message));
        throw new Error(error.message);
      } else if (data) {
        console.log('customer subscription updated successfully');
        console.log(chalk.underline(data));
      }
    }

    if (event.type === 'customer.subscription.updated') {
      const subscription: Stripe.Subscription = event.data.object;
      // const userId = subscription.metadata?.user_id;

      const { error, data } = await supabaseAdmin
        .from('stripe_customers')
        .update({ plan_expires: subscription.cancel_at })
        .eq('subscription_id', subscription.id);

      if (error) {
        console.error(chalk.red(error.message));
        throw new Error(error.message);
      } else if (data) {
        console.log('customer subscription updated successfully');
        console.log(chalk.underline(data));
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription: Stripe.Subscription = event.data.object;
      const { error, data } = await supabaseAdmin
        .from('stripe_customers')
        .update({ plan_active: false, subscription_id: null })
        .eq('subscription_id', subscription.id);
      if (error) {
        console.error(chalk.red(error.message));
        throw new Error(error.message);
      } else if (data) {
        console.log('customer subscription updated successfully');
        console.log(chalk.underline(data));
      }
    }

    return NextResponse.json({ message: 'success' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
