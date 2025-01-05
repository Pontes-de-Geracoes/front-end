import axios, { AxiosHeaders, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

const token = Cookies.get("token");
export const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const handleServerError = (e: unknown) => {
  if ((e as { code?: string }).code === "ERR_NETWORK")
    window.location.href = "/500";
  console.log(e);
};

export const handleResponse = <T>(
  res: AxiosResponse<T>,
  expectedStatus: number
): T => {
  if (res.status !== expectedStatus) throw new Error(JSON.stringify(res));

  return res.data;
};

export const handleRequest = async <T>(
  method: string,
  url: string,
  withCredentials: boolean = true,
  expectedStatus: number = 200,
  data?: object,
  config?: AxiosHeaders
): Promise<T | null> => {
  try {
    const response: AxiosResponse<T> = await axios({
      baseURL: import.meta.env.VITE_URL_API,
      method,
      url,
      data,
      headers: withCredentials ? getConfig().headers : {},
      ...config,
    });

    return handleResponse(response, expectedStatus);
  } catch (e) {
    handleServerError(e);
    return null;
  }
};
