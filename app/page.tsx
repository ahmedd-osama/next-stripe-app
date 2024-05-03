import CheckoutButton from './CheckoutButton';
import EmbeddedCheckoutForm from './EmbeddedCheckoutForm';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-center uppercase">Discover all the new images of today</h1>
      <CheckoutButton />
      <EmbeddedCheckoutForm />
    </main>
  );
}
