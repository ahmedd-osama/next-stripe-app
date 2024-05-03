import React from 'react';
import Link from 'next/link';
const PaymentSuccessPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful</h2>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </div>
        <Link className="btn btn-primary w-full" href={'/'}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
