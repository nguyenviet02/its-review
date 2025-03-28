'use server';

import { getServerSession } from 'next-auth';
import SignInButton from '@/components/auth/SignInButton';
import SignOutButton from '@/components/auth/SignOutButton';
import { authConfig } from '../api/auth/[...nextauth]/authConfig';

export default async function LoginPage() {
  const session = await getServerSession(authConfig);
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex h-fit w-full max-w-[500px] flex-col items-center justify-center rounded-md bg-slate-300 px-10 py-6">
        {!session?.user?.email ? (
          <>
            <h1 className="mb-4 text-center text-2xl">Đăng nhập</h1>
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="email" className="w-full py-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" className="w-full py-1" />
              </div>
              <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white">
                Đăng nhập
              </button>
            </div>
            <div className="my-6 h-[1px] w-full bg-slate-600"></div>
            <SignInButton />
          </>
        ) : (
          <SignOutButton />
        )}
      </div>
    </div>
  );
}
