"use client";

import { getNotification } from "@/apis/notification";
import { useNotificationPopupStore } from "@/lib/zustand/notificationPopupStore";
import { INotification } from "@/types";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

// Mock notifications for demonstration
const mockNotifications: INotification[] = [
  {
    id: "1",
    title: "Review Deadline Approaching",
    content:
      "You have 5 days left to complete your self-assessment for Q2 2023.",
    createdAt: new Date().toISOString(),
    isRead: false,
    type: "deadline",
  },
  {
    id: "2",
    title: "Manager Review Completed",
    content:
      "Your manager has completed your performance review. You can check the results now.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isRead: false,
    type: "review",
  },
  {
    id: "3",
    title: "New Assessment Period",
    content:
      "A new assessment period for Q3 2023 has been opened. You can start your self-assessment.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isRead: true,
    type: "period",
  },
];

const NotificationPopup = () => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { isOpen, closePopup, notifications, setNotifications, markAllAsRead } =
    useNotificationPopupStore();

  const getListNotificationQuery = useQuery({
    queryKey: ["getListNotification", isOpen],
    queryFn: getNotification,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });
  console.log(
    "☠️ ~ NotificationPopup ~ getListNotificationQuery:",
    getListNotificationQuery,
  );

  useEffect(() => {
    // For demonstration purposes, we'll use mock data
    setNotifications(mockNotifications);
  }, [setNotifications]);

  const handleClose = () => {
    if (dontShowAgain) {
      // Set timestamp in localStorage to prevent auto-showing for 1 hour
      const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem(
        "notification_dont_show_until",
        expiryTime.toString(),
      );
    }
    closePopup();
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5" />
                    <span>Notifications</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </DialogTitle>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                  <span className="text-sm text-gray-500">
                    {notifications.filter((n) => !n.isRead).length} unread
                  </span>
                </div>

                <div className="mt-2 max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="py-4 text-center text-gray-500">
                      No notifications
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`py-4 ${!notification.isRead ? "bg-blue-50" : ""}`}
                        >
                          <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                  {notification.title}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {formatDate(notification.createdAt)}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500">
                                {notification.content}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5 flex items-center">
                  <input
                    id="dont-show-again"
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="dont-show-again"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    Don&apos;t auto show again for 1 hour
                  </label>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotificationPopup;
