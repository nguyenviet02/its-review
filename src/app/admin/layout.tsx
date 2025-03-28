'use client';

import DialogDataAssessmentPeriod from '@/components/admin/assessment-period-management/dialog/DialogListEmployee';
import DialogEmployeeInfo from '@/components/admin/employee-management/DialogEmployeeInfo';
import DialogAssessmentPeriod from '@/components/admin/assessment-period-management/dialog/DialogAssessmentPeriod';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ROLES } from '@/types';
import { useState } from 'react';
import DialogListManager from '@/components/admin/assessment-period-management/dialog/DialogListManager';
import DialogExtendTime from '@/components/admin/assessment-period-management/dialog/DialogExtendTime';

export default function SuperAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar
        role={ROLES.SUPER_ADMIN}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="w-full lg:pl-72">
        <main className="w-full">
          <Header setSidebarOpen={setSidebarOpen} />
          <div className="w-full px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
      <DialogEmployeeInfo />
      <DialogDataAssessmentPeriod />
      <DialogAssessmentPeriod />
      <DialogListManager />
      <DialogExtendTime />
    </>
  );
}
