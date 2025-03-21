"use client";

import { getNotification } from "@/services/api/notification";
import { useNotificationPopupStore } from "@/store/slices/notification";
import { useReviewFormDialogStore } from "@/store/slices/assessment";
import { useEmployeeDialogSummaryInfoStore } from "@/store/slices/dialog";
import { INotificationResponseAPI } from "@/types";
import { formatDate, getFormType } from "@/utils";

import {
  Transition,
  Dialog,
  TransitionChild,
  DialogTitle,
  DialogPanel,
  Button,
} from "@headlessui/react";
import { XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";

/**
 * Notification popup component that displays notifications and allows actions
 */
const NotificationPopup = () => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { isOpen, closePopup, notifications, setNotifications } =
    useNotificationPopupStore();
  const session = useSession();

  // Fetch notifications when popup is opened
  const getListNotificationQuery = useQuery({
    queryKey: ["getListNotification", isOpen],
    queryFn: getNotification,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!getListNotificationQuery?.data) return;
    setNotifications(getListNotificationQuery.data);
  }, [getListNotificationQuery?.data, setNotifications]);

  // Handle "don't show again" preference
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

  // Store actions for opening forms
  const setSummaryInfoData = useEmployeeDialogSummaryInfoStore(
    (store) => store.setDialogData,
  );
  const openDialogSummaryInfo = useEmployeeDialogSummaryInfoStore(
    (store) => store.openDialog,
  );
  const setUserId = useReviewFormDialogStore((store) => store.setUserId);
  const setAssessmentPeriodId = useReviewFormDialogStore(
    (store) => store.setAssessmentPeriodId,
  );
  const setFormType = useReviewFormDialogStore((store) => store.setFormType);
  const setIsManager = useReviewFormDialogStore((store) => store.setIsManager);

  // Handle opening employee summary dialog
  const handleOpenSummaryDialog = (notification: INotificationResponseAPI) => {
    const isManager = true;
    const formType = getFormType(notification.employee.jobPosition, isManager);

    // Set up dialog data
    setSummaryInfoData({
      id: notification.employee.id,
      username: notification.employee.username,
      department: notification.employee.department,
      jobPosition: notification.employee.jobPosition,
    });

    // Set up review form data for later use
    setUserId(notification.employee.id);
    setIsManager(isManager);
    setAssessmentPeriodId(notification.annualReview.id as number);
    setFormType(formType);

    // Open the dialog
    openDialogSummaryInfo();
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
                  className="flex items-center justify-between border-b border-gray-200 pb-3 text-lg font-medium leading-6 text-gray-900"
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

                <Loading isLoading={getListNotificationQuery?.isLoading}>
                  <div className="mt-2 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="py-4 text-center text-gray-500">
                        No notifications
                      </p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {notifications.map((notification, index) => {
                          const isSelfReview =
                            notification?.employee?.id ===
                            session?.data?.user?.id;
                          return (
                            <li
                              key={`${notification?.employee?.id}-${index}`}
                              className="mb-2 rounded-lg bg-gray-100 px-4 py-4 transition-colors duration-200 hover:bg-gray-200"
                            >
                              <div className="flex space-x-3">
                                <Button
                                  onClick={() =>
                                    handleOpenSummaryDialog(notification)
                                  }
                                  className="flex-1 space-y-2 text-left"
                                >
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                      {`${notification?.annualReview?.title} - ${notification?.employee?.username}`}
                                    </h3>
                                  </div>
                                  <p className="text-sm text-gray-950">
                                    {isSelfReview
                                      ? "Please review yourself. Click here to open the review form."
                                      : `You need to review ${notification?.employee?.username}. Click here to open the review form.`}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    This form will be available until{" "}
                                    <span className="font-semibold text-gray-900">
                                      {formatDate(
                                        isSelfReview
                                          ? notification?.annualReview
                                              ?.selfReviewEnd
                                          : notification?.annualReview?.end,
                                      )}
                                    </span>
                                  </p>
                                </Button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </Loading>

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
