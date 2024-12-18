import { NecessityScheme } from "@/schemes/necessity/necessity.scheme";
import { api, handleServerError } from "@/utils/http";

const getAll = async () => {
  try {
    const res = await api.get<NecessityScheme[]>("/necessities");
    if (res.status !== 200) throw new Error(JSON.stringify(res));
    return res.data;
  } catch (e) {
    handleServerError(e);
    return <NecessityScheme[]>{};
  }
};

export const necessityServices = {
    getAll
  };
  