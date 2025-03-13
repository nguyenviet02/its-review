"use client";

import { getListAssessmentPeriod } from "@/apis/assessment";
import { getDataDashboard } from "@/apis/dashboard";
import SelectBox from "@/components/admin/dashboard/SelectBox";
import Loading from "@/components/common/Loading";
import { IAssessmentPeriodResponseAPI } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { PieChart } from "@mui/x-charts";

const Admin = () => {
  const [listAssessmentPeriod, setListAssessmentPeriod] = React.useState<
    IAssessmentPeriodResponseAPI[]
  >([]);
  const [selectedAssessmentPeriodId, setSelectedAssessmentPeriodId] =
    React.useState<number | null>(null);

  const listAssessmentPeriodQuery = useQuery({
    queryKey: ["organization-listAssessmentPeriod"],
    queryFn: () => getListAssessmentPeriod(9999, 0),
    refetchOnWindowFocus: false,
  });

  const dataDashboardQuery = useQuery({
    queryKey: ["dashboard", selectedAssessmentPeriodId],
    queryFn: async () => await getDataDashboard(selectedAssessmentPeriodId!),
    enabled: !!selectedAssessmentPeriodId,
  });
  const { data: dataDashboard } = dataDashboardQuery;

  useEffect(() => {
    if (!listAssessmentPeriodQuery?.data?.data?.data) return;
    const listAssessmentPeriodData =
      listAssessmentPeriodQuery?.data?.data?.data;
    setListAssessmentPeriod(listAssessmentPeriodData);
    const defaultSelectedId = listAssessmentPeriodData[0]?.id || null;
    setSelectedAssessmentPeriodId(defaultSelectedId);
  }, [listAssessmentPeriodQuery?.data?.data?.data]);

  return (
    <div className="size-full">
      <Loading isLoading={listAssessmentPeriodQuery.isLoading}>
        <SelectBox
          listAssessmentPeriod={listAssessmentPeriod}
          selectedAssessmentPeriodId={selectedAssessmentPeriodId}
          setSelectedAssessmentPeriodId={setSelectedAssessmentPeriodId}
        />
      </Loading>
      {!!selectedAssessmentPeriodId && (
        <div className="w-full">
          <Loading isLoading={dataDashboardQuery.isLoading}>
            <div className="mt-4 flex flex-col gap-4">
              {/* Add your dashboard content here */}
              {dataDashboard && (
                <>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center rounded border border-black p-4">
                      <p className="font-bold">Total Employee</p>
                      <p>
                        {dataDashboard?.userCount}
                        {" employees"}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded border border-black p-4">
                      <p className="font-bold">
                        Total Employee in this assessment period
                      </p>
                      <p>
                        {dataDashboard?.employeeInAnnualReviewCount}
                        {" employees"}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center gap-10">
                    <div className="border border-black">
                      <PieChart
                        series={[
                          {
                            data: [
                              {
                                id: 0,
                                value:
                                  dataDashboard?.reviewStatusRatio
                                    ?.waitingEmployee,
                                label: "waiting Employee",
                              },
                              {
                                id: 1,
                                value:
                                  dataDashboard?.reviewStatusRatio
                                    ?.waitingManager,
                                label: "waiting Manager",
                              },
                              {
                                id: 2,
                                value:
                                  dataDashboard?.reviewStatusRatio?.completed,
                                label: "Completed",
                              },
                            ],
                          },
                        ]}
                        width={500}
                        height={200}
                      />
                    </div>
                    <div className="h-full p-4 border border-black">
                      {dataDashboard?.reviewCountByDepartment?.map(
                        (department, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {`Total employees of ${department.department}: ${department?.count} employees`}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Loading>
        </div>
      )}
    </div>
  );
};

export default Admin;
