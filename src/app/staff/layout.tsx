'use client';

import Header from '@/layouts/Header';
import Sidebar from '@/layouts/Sidebar';
import { ROLES } from '@/types';
import { useState } from 'react';

export default function SuperAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar role={ROLES.STAFF} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-72 w-full">
        <main className="w-full">
          <Header setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 w-full">{children}</div>
        </main>
      </div>
    </>
  );
}
