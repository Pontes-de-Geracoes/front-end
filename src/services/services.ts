import { AxiosHeaders } from "axios";
import { handleRequest } from "../utils/http";

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
