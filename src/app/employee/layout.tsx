"use client";

import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";
import { ROLES } from "@/types";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DialogSummaryInfo from "@/components/employee/DialogSummaryInfo";
import DialogFormReview from "@/components/employee/DialogFormReview";
import DialogCongratulation from "@/components/employee/DialogCongratulation";
import DialogDataAssessmentPeriod from "@/components/employee/review-employee/DialogDataAssessmentPeriod";
import NotificationPopup from "@/components/notification/NotificationPopup";
import NotificationController from "@/components/notification/NotificationController";

export default function SuperAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationBaseRole = useMemo(() => {
    return [
      { name: "Self Assessment", href: "/employee" },
      { name: "Employee Assessment", href: "/employee/review-employee" },
    ];
  }, []);

  const isCurrent = (href: string) => {
    return href === pathname;
  };
  return (
    <>
      <Sidebar
        role={ROLES.STAFF}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="w-full lg:pl-72">
        <main className="w-full">
          <Header setSidebarOpen={setSidebarOpen} />
          <div className="flex w-full flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">List of Assessment Period</h1>

            {/* Navigation */}
            <div className="flex gap-2">
              {navigationBaseRole?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`block pb-1 ${isCurrent(item.href) ? "border-b border-neutral-400" : ""}`}
                  >
                    <span className="block p-2 text-sm font-medium">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Filter */}

            {/* Content */}
            <div className="w-full py-4">{children}</div>
          </div>
        </main>
      </div>
      <DialogSummaryInfo />
      <DialogFormReview />
      <DialogCongratulation />
      <DialogDataAssessmentPeriod />
      <NotificationPopup />
      <NotificationController />
    </>
  );
}
