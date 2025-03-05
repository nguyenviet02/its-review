import axiosInstance from "@/lib/axios/axiosInstance";
import { IEmployee } from "@/types";

export const getListUser = async (
  limit: number,
  page: number,
  order: string = "ASC",
) => {
  const res = await axiosInstance.get(`/api/v1/users`, {
    params: {
      limit: limit,
      page: page + 1, // DataGrid page start from 0
      order: order,
    },
  });
  return res;
};

export const importListUser = async (listUser: IEmployee[]) => {
  const res = await axiosInstance.post("/api/v1/users", listUser);
  return res;
};
