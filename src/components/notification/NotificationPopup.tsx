"use client";

import { getNotification } from "@/apis/notification";
import { useNotificationPopupStore } from "@/lib/zustand/notificationPopupStore";
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
import Loading from "../common/Loading";
import { INotificationResponseAPI, JOB_POSITIONS } from "@/types";
import { getFormType } from "@/utils";
import { useEmployeeDialogSummaryInfoStore } from "@/lib/zustand/employeeDialogSummaryInfoStore";
import { useReviewFormDialogStore } from "@/lib/zustand/reviewFormDialogStore";

const NotificationPopup = () => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { isOpen, closePopup, notifications, setNotifications } =
    useNotificationPopupStore();
  console.log("☠️ ~ NotificationPopup ~ notifications:", notifications);

  const getListNotificationQuery = useQuery({
    queryKey: ["getListNotification", isOpen],
    queryFn: getNotification,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!getListNotificationQuery?.data) return;
    setNotifications(getListNotificationQuery.data);
  }, [getListNotificationQuery.data, setNotifications]);

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

  const handleOpenSummaryDialog = (data: INotificationResponseAPI) => {
    const isManager = true;
    const newJobPosition = JOB_POSITIONS.DEV;
    const formType = getFormType(newJobPosition, isManager);
    setSummaryInfoData({
      id: data.employee.id,
      username: data.employee.username,
      department: data.employee.department,
      jobPosition: data.employee.jobPosition,
    });
    setUserId(data.employee.id);
    setIsManager(isManager);
    setAssessmentPeriodId(data.annualReview.id as number);
    setFormType(formType);
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

                <Loading isLoading={getListNotificationQuery.isLoading}>
                  <div className="mt-2 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="py-4 text-center text-gray-500">
                        No notifications
                      </p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {notifications.map((notification, index) => (
                          <li
                            key={`${notification?.employee?.id}-${index}`}
                            className={`bg-gray-100 px-2 py-4`}
                          >
                            <div className="flex space-x-3">
                              <Button
                                onClick={() =>
                                  handleOpenSummaryDialog(notification)
                                }
                                className="flex-1 space-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium">
                                    {`${notification?.annualReview?.title} - ${notification?.employee?.username}`}
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {`You need to review ${notification?.employee?.username}. Click here to open the review form.`}
                                </p>
                              </Button>
                            </div>
                          </li>
                        ))}
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
