import Link from 'next/link';
import React from 'react';

const CancelPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.707-11.293a1 1 0 00-1.414-1.414L10 8.586l-1.293-1.293a1 1 0 00-1.414 1.414l1.293 1.293-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414l-1.293-1.293 1.293-1.293a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Cancellation Successful</h2>
          <p className="text-gray-600">Your order has been cancelled.</p>
        </div>
        <Link href="/" className="btn btn-primary w-full">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
