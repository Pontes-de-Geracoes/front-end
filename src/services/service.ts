import axios, { AxiosResponse, AxiosHeaders, AxiosRequestConfig } from "axios";
import { handleServerError } from "../utils/http";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getConfig = (): AxiosRequestConfig<object> => ({
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

const handleRequest = async <T>(
  method: string,
  url: string,
  withCredentials: boolean = true,
  expectedStatus: number = 200,
  data?: object,
  config?: AxiosHeaders
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      baseURL: import.meta.env.VITE_URL_API,
      method,
      url,
      data,
      headers: withCredentials ? getConfig().headers : {},
      ...config,
    });

    console.log(response);

    return handleResponse(response, expectedStatus);
  } catch (e) {
    handleServerError(e);
    return {} as T;
  }
};

export const services = {
  get: <T>({
    url,
    withCredentials = true,
    expectedStatus = 200,
    config,
  }: {
    url: string;
    withCredentials?: boolean;
    expectedStatus?: number;
    config?: AxiosHeaders;
  }) =>
    handleRequest<T>(
      "GET",
      url,
      withCredentials,
      expectedStatus,
      undefined,
      config
    ),

  post: <T>({
    url,
    data,
    withCredentials = true,
    expectedStatus = 201,
    config,
  }: {
    url: string;
    data: object;
    withCredentials?: boolean;
    expectedStatus?: number;
    config?: AxiosHeaders;
  }) =>
    handleRequest<T>(
      "POST",
      url,
      withCredentials,
      expectedStatus,
      data,
      config
    ),

  put: <T>({
    url,
    data,
    withCredentials = true,
    expectedStatus = 200,
    config,
  }: {
    url: string;
    data: object;
    withCredentials?: boolean;
    expectedStatus?: number;
    config?: AxiosHeaders;
  }) =>
    handleRequest<T>("PUT", url, withCredentials, expectedStatus, data, config),

  delete: <T>({
    url,
    withCredentials = true,
    expectedStatus = 204,
    config,
  }: {
    url: string;
    withCredentials?: boolean;
    expectedStatus?: number;
    config?: AxiosHeaders;
  }) =>
    handleRequest<T>(
      "DELETE",
      url,
      withCredentials,
      expectedStatus,
      undefined,
      config
    ),
};
