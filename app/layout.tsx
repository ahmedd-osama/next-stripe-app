import type { Metadata } from 'next';
import Link from 'next/link';
import { Tajawal } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const tajwal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin', 'arabic'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tajwal.className}>
        <Navbar />
        <main className="text-ce prose p-12">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl ">
          🔥 Stripe for SaaS
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" className="btn">
              Home
            </Link>
          </li>
          <li>
            <Link href="/photos" className="btn mx-3">
              Photos
            </Link>
          </li>
          <li>
            <Link href="/user" className="btn">
              User Auth
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
