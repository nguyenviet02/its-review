import React from 'react';
import { IDepartmentReviewCount, IReviewStatusRatio } from '@/types';

type MetricsProps = {
  departmentData: IDepartmentReviewCount[];
  statusRatioData: IReviewStatusRatio;
  isLoading?: boolean;
};

/**
 * Dashboard metrics component showing review statistics
 */
export default function DashboardMetrics({
  departmentData,
  statusRatioData,
  isLoading = false,
}: MetricsProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 h-12 w-12"></div>
      </div>
    );
  }

  const totalReviews = departmentData.reduce(
    (acc, dept) => acc + dept.count,
    0
  );

  const statusRatioPercentages = {
    waitingEmployee: Math.round(
      (statusRatioData.waitingEmployee / totalReviews) * 100
    ),
    waitingManager: Math.round(
      (statusRatioData.waitingManager / totalReviews) * 100
    ),
    completed: Math.round((statusRatioData.completed / totalReviews) * 100),
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Department Breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h3 className="text-lg font-semibold">Reviews by Department</h3>
        <div className="mt-4 space-y-3">
          {departmentData.map((dept) => (
            <div key={dept.department} className="flex justify-between">
              <span>{dept.department}</span>
              <span className="font-medium">{dept.count} reviews</span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{totalReviews} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h3 className="text-lg font-semibold">Review Status</h3>
        <div className="mt-4 space-y-4">
          {/* Progress bars */}
          <div>
            <div className="flex justify-between">
              <span>Waiting for Employee</span>
              <span>{statusRatioPercentages.waitingEmployee}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-yellow-500"
                style={{ width: `${statusRatioPercentages.waitingEmployee}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Waiting for Manager</span>
              <span>{statusRatioPercentages.waitingManager}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${statusRatioPercentages.waitingManager}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span>{statusRatioPercentages.completed}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${statusRatioPercentages.completed}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
