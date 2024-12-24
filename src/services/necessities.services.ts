import { NecessityScheme } from "@/schemes/necessity/necessity.scheme";
import { api, handleResponse, handleServerError } from "@/utils/http";

const getAll = async () => {
  try {
    const res = await api.get<NecessityScheme[]>("/necessities");
    return handleResponse(res, 200);
  } catch (e) {
    handleServerError(e);
    return <NecessityScheme[]>{};
  }
};

export const necessityServices = {
  getAll,
};
