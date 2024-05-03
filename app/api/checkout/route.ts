import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
type ResponseData = {
  priceId: string;
  email: string;
  userId: string;
};
export async function POST(request: Request) {
  try {
    const { priceId, email, userId } = await request.json();
    const session = await stripe.checkout.sessions.create({
      metadata: {
        user_id: userId,
        email: email,
      },
      customer_email: email,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
        },
        // {
        //   price: 'price_1PCD46Jd4CAlgb48e5wbLjD7',
        // },
      ],
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
    });
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
