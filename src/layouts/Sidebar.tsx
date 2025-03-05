"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  HomeIcon,
  XMarkIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  RectangleGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { ROLES } from "@/types";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SidebarProps = {
  role: ROLES;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({
  role,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathName = usePathname();

  const navigation = useMemo(() => {
    if (role === ROLES.SUPER_ADMIN) {
      return [
        {
          name: "Dashboard",
          href: "/admin",
          icon: HomeIcon,
          current: pathName === "/admin",
        },
        {
          name: "Employee Management",
          href: "/admin/employee-management",
          icon: UserGroupIcon,
          current: pathName?.includes("/admin/employee-management"),
        },
        // {
        //   name: "Document Management",
        //   href: "/admin/documents-management",
        //   icon: DocumentTextIcon,
        //   current: pathName?.includes("/admin/documents-management"),
        // },
        {
          name: "Assessment Period Management",
          href: "/admin/assessment-period-management",
          icon: CalendarDaysIcon,
          current: pathName?.includes("/admin/assessment-period-management"),
        },
        // {
        //   name: "Department Management",
        //   href: "/admin/departments-management",
        //   icon: RectangleGroupIcon,
        //   current: pathName?.includes("/admin/departments-management"),
        // },
        // {
        //   name: "Admin Management",
        //   href: "/admin/admin-management",
        //   icon: IdentificationIcon,
        //   current: pathName?.includes("/admin/admin-management"),
        // },
      ];
    }

    if (role === ROLES.ADMIN) {
      return [
        { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
        {
          name: "Quản lý nhân sự",
          href: "/admin/users-management",
          icon: UserGroupIcon,
          // current: pathName?.includes("/admin/users-management"),
        },
        {
          name: "Quản lý đơn từ",
          href: "/admin/documents-management",
          icon: DocumentTextIcon,
          current: pathName?.includes("/admin/documents-management"),
        },
        {
          name: "Quản lý kỳ đánh giá",
          href: "/admin/assessment-period-management",
          icon: CalendarDaysIcon,
          current: pathName?.includes("/admin/assessment-period-management"),
        },
        {
          name: "Quản lý phòng ban",
          href: "/admin/departments-management",
          icon: RectangleGroupIcon,
          current: pathName?.includes("/admin/departments-management"),
        },
      ];
    }

    return [
      { name: "Đơn từ", href: "/employee", icon: DocumentTextIcon, current: true },
    ];
  }, [pathName, role]);
  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">ITS Review</div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`${
                              item.current
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                            } group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold`}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={`${item.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"} size-6 shrink-0`}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center text-3xl font-bold">
            ITS Review
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`${item.current ? "bg-gray-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"} group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold`}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={`${item.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"} size-6 shrink-0`}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
