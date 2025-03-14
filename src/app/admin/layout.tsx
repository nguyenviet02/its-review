"use client";

import DialogCreateAssessmentPeriod from "@/components/admin/assessment-period-management/DialogCreateAssessmentPeriod";
import DialogDataAssessmentPeriod from "@/components/admin/assessment-period-management/DialogDataAssessmentPeriod";
import DialogEmployeeInfo from "@/components/admin/employee-management/DialogEmployeeInfo";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ROLES } from "@/types";
import { useState } from "react";

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
      <DialogCreateAssessmentPeriod />
			<DialogDataAssessmentPeriod />
    </>
  );
}
