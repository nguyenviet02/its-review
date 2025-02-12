'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div>
      <button
        className=""
        onClick={(e) => {
          e.preventDefault();
          signIn('azure-ad', { callbackUrl: '/role-checking' }, { prompt: 'login' });
        }}
      >
        Log in
      </button>
    </div>
  );
}
