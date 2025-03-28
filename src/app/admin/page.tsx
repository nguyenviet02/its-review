'use client';

import SelectBox from '@/components/admin/dashboard/SelectBox';
import { IAssessmentPeriodResponseAPI } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { PieChart, BarChart } from '@mui/x-charts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Updated import for Grid
import Loading from '@/components/ui/Loading';
import { getDataDashboard, getListAssessmentPeriod } from '@/services/api';

const Admin = () => {
  const [listAssessmentPeriod, setListAssessmentPeriod] = React.useState<
    IAssessmentPeriodResponseAPI[]
  >([]);
  const [selectedAssessmentPeriodId, setSelectedAssessmentPeriodId] =
    React.useState<number | null>(null);

  const listAssessmentPeriodQuery = useQuery({
    queryKey: ['organization-listAssessmentPeriod'],
    queryFn: () => getListAssessmentPeriod(9999, 0),
    refetchOnWindowFocus: false,
  });

  const dataDashboardQuery = useQuery({
    queryKey: ['dashboard', selectedAssessmentPeriodId],
    queryFn: async () => await getDataDashboard(selectedAssessmentPeriodId!),
    enabled: !!selectedAssessmentPeriodId,
  });
  const { data: dataDashboard } = dataDashboardQuery;

  useEffect(() => {
    if (!listAssessmentPeriodQuery?.data?.data) return;
    const listAssessmentPeriodData = listAssessmentPeriodQuery?.data?.data;

    // Only update state if necessary
    if (listAssessmentPeriod !== listAssessmentPeriodData) {
      setListAssessmentPeriod(listAssessmentPeriodData);

      if (!selectedAssessmentPeriodId) {
        const defaultSelectedId = listAssessmentPeriodData[0]?.id || null;
        setSelectedAssessmentPeriodId(defaultSelectedId);
      }
    }
  }, [
    listAssessmentPeriod,
    listAssessmentPeriodQuery?.data,
    selectedAssessmentPeriodId,
  ]);

  return (
    <div className="size-full p-4">
      <Loading
        isLoading={
          listAssessmentPeriodQuery.isLoading || dataDashboardQuery.isLoading
        }
      >
        <SelectBox
          listAssessmentPeriod={listAssessmentPeriod}
          selectedAssessmentPeriodId={selectedAssessmentPeriodId}
          setSelectedAssessmentPeriodId={setSelectedAssessmentPeriodId}
        />
        <div className="w-full">
          <Loading isLoading={dataDashboardQuery.isLoading}>
            <Grid container spacing={3} className="mt-2">
              {/* Section 1: Total Employee */}
              <Grid size={6}>
                <Card variant="outlined" className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Typography variant="h6" gutterBottom className="font-bold">
                      Total Employees
                    </Typography>
                    <Typography variant="h3" color="primary">
                      {dataDashboard?.userCount || 0}
                    </Typography>
                    <Typography variant="body1">employees</Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 2: Total Employee in Assessment Period */}
              <Grid size={6}>
                <Card variant="outlined" className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Typography variant="h6" gutterBottom className="font-bold">
                      Employees in Current Assessment
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {dataDashboard?.employeeInAnnualReviewCount || 0}
                    </Typography>
                    <Typography variant="body1">employees</Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 3: Pie Chart - Review Status Ratio */}
              <Grid
                size={{
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 6,
                }}
              >
                <Card variant="outlined">
                  <CardContent className="flex flex-col gap-4">
                    <Typography
                      variant="h6"
                      className="mb-4 text-center font-bold"
                    >
                      Review Status Distribution
                    </Typography>
                    <Box sx={{ height: 300 }}>
                      <PieChart
                        series={[
                          {
                            data: [
                              {
                                id: 0,
                                value:
                                  dataDashboard?.reviewStatusRatio
                                    .waitingEmployee || 0,
                                label: 'Waiting Employee',
                                color: '#ff9800',
                              },
                              {
                                id: 1,
                                value:
                                  dataDashboard?.reviewStatusRatio
                                    .waitingManager || 0,
                                label: 'Waiting Manager',
                                color: '#2196f3',
                              },
                              {
                                id: 2,
                                value:
                                  dataDashboard?.reviewStatusRatio.completed ||
                                  0,
                                label: 'Completed',
                                color: '#4caf50',
                              },
                            ],
                            highlightScope: {
                              faded: 'global',
                              highlighted: 'item',
                            },
                            faded: {
                              innerRadius: 30,
                              additionalRadius: -30,
                              color: 'gray',
                            },
                            arcLabel: (item) => `${item.value}`,
                            arcLabelMinAngle: 35,
                            arcLabelRadius: '60%',
                          },
                        ]}
                        height={300}
                        margin={{ top: 0, bottom: 0, left: 0, right: 160 }}
                        slotProps={{
                          legend: {
                            direction: 'column',
                            position: {
                              vertical: 'middle',
                              horizontal: 'right',
                            },
                            padding: 0,
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 4: Bar Chart - Review Count by Department */}
              <Grid
                size={{
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 6,
                }}
              >
                <Card variant="outlined">
                  <CardContent className="flex flex-col gap-4">
                    <Typography
                      variant="h6"
                      className="mb-4 text-center font-bold"
                    >
                      Employees by Department
                    </Typography>
                    <Box sx={{ height: 300 }}>
                      {!!dataDashboard?.reviewCountByDepartment?.length ? (
                        <BarChart
                          dataset={dataDashboard?.reviewCountByDepartment.map(
                            (item) => ({
                              ...item,
                              [item.department]: item.count,
                            })
                          )}
                          xAxis={[{ scaleType: 'band', dataKey: 'department' }]}
                          series={[
                            {
                              dataKey: 'count',
                              valueFormatter: (v) => `${v} employees`,
                              color: '#3f51b5',
                            },
                          ]}
                          layout="vertical"
                          height={300}
                          margin={{
                            left: 80,
                            right: 20,
                            top: 10,
                            bottom: 30,
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p>No data available for this assessment period.</p>
                        </div>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Loading>
        </div>
      </Loading>
    </div>
  );
};

export default Admin;
