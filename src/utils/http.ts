import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

export const handleServerError = (e: unknown) => {
  if ((e as { code?: string }).code === "ERR_NETWORK")
    window.location.href = "/500";
  console.log(e);
};

export const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const handleResponse = <T>(
  res: AxiosResponse<T>,
  expectedStatus: number
): T => {
  if (res.status !== expectedStatus) {
    throw new Error(JSON.stringify(res));
  }
  return res.data;
};
