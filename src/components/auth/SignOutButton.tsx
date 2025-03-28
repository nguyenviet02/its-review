'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-slate-900"
    >
      Đăng xuất
    </button>
  );
};

export default SignOutButton;
