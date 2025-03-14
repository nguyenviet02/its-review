"use client";

import { useNotificationPopupStore } from "@/store/slices/notification";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Controller component for showing notifications automatically on employee pages
 */
const NotificationController = () => {
  const { openPopup } = useNotificationPopupStore();
  const pathname = usePathname();

  useEffect(() => {
    // Only show notifications on employee pages
    const isEmployeePage = pathname === "/employee" || pathname === "/employee/review-employee";
    
    if (isEmployeePage) {
      // Check if we should show the notification popup
      const dontShowUntil = localStorage.getItem('notification_dont_show_until');
      const currentTime = Date.now();
      
      // Show the popup if:
      // 1. There's no "don't show until" timestamp, or
      // 2. The current time is past the "don't show until" time
      if (!dontShowUntil || currentTime > parseInt(dontShowUntil, 10)) {
        // Add a small delay to ensure the page has loaded properly
        const timer = setTimeout(() => {
          openPopup();
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, openPopup]);

  return null; // This is just a controller, no UI
};

export default NotificationController;
