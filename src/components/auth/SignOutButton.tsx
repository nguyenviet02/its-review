'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-md"
    >
      Đăng xuất
    </button>
  );
};

export default SignOutButton;
