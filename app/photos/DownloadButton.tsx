'use client';

import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';

export default function DownloadButton({ image }: { image: string }) {
  const handleDownload = async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const res = await fetch('/api/usage-meter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ image }),
    });

    if (res.ok) {
      const { total_downloads } = await res.json();
      toast.success(`Success! You have downloaded ${total_downloads} images`);
    } else {
      const err = await res.json();
      toast.error(`Error! ${err.message}`);
    }
  };

  return (
    <>
      <button onClick={handleDownload} className="rounded bg-blue-500 px-4 py-2 text-white">
        Download
      </button>
    </>
  );
}
