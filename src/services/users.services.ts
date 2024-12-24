import { api, handleResponse, handleServerError } from "../utils/http";
import { UserCardScheme } from "../schemes/user/userCard.schema";

const getAll = async () => {
  try {
    const res = await api.get<UserCardScheme[]>("/users", {});
    return handleResponse(res, 200);
  } catch (e) {
    handleServerError(e);
    return <UserCardScheme[]>{};
  }
};

export const usersServices = {
  getAll,
};
