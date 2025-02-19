'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import MicrosoftIcon from '@/assets/icons/microsoft.svg';

const SignInButton = () => {
  return (
    <button
      className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-md"
      onClick={(e) => {
        e.preventDefault();
        signIn('azure-ad', { callbackUrl: '/' }, { prompt: 'login' });
      }}
    >
      <Image src={MicrosoftIcon} alt="ITS Review" width={24} height={24} />
      Đăng nhập với Microsoft
    </button>
  );
};

export default SignInButton;
