'use server';

import { getServerSession } from 'next-auth';
import { authConfig } from '../api/auth/[...nextauth]/route';
import SignInButton from '@/components/auth/SignInButton';
import SignOutButton from '@/components/auth/SignOutButton';

export default async function LoginPage() {
  const session = await getServerSession(authConfig);
  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <div className="w-full max-w-[500px] bg-slate-300 h-fit px-10 py-6 flex flex-col justify-center items-center rounded-md">
        {!session?.user?.email ? (
          <>
            <h1 className="text-center text-2xl mb-4">Đăng nhập để bắt đầu</h1>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="email" className="w-full py-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" className="w-full py-1" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Đăng nhập</button>
            </div>
            <div className="w-full my-6 h-[1px] bg-slate-600"></div>
            <SignInButton />
          </>
        ) : (
          <SignOutButton />
        )}
      </div>
    </div>
  );
}
