import axiosInstance from "@/lib/axios/axiosInstance";

export const meQuery = async () => {
  const res = await axiosInstance.get(
    `/api/v1/users/me`,
  );
  return res;
};
