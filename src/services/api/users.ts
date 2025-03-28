import { IEmployee } from '@/types';
import axiosInstance from './axiosInstance';

export const getListUser = async (
  limit: number,
  page: number,
  order: string = 'ASC'
) => {
  const { data } = await axiosInstance.get(`/api/v1/users`, {
    params: {
      limit: limit,
      page: page + 1, // DataGrid page start from 0
      order: order,
    },
  });
  return data;
};

export const importListUser = async (listUser: IEmployee[]) => {
  const res = await axiosInstance.post('/api/v1/users', listUser);
  return res;
};
