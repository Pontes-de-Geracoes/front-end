import { MeetingScheme } from "../schemes/meeting/meeting.scheme";
import {
  api,
  getConfig,
  handleResponse,
  handleServerError,
} from "../utils/http";
import { MeetingCreateScheme } from "../schemes/meeting/meeting-create.scheme";
import { MeetingCardScheme } from "../schemes/meeting/meeting-card.scheme";
import { MeetingUpdateScheme } from "../schemes/meeting/meeting.-update.scheme";

const getAll = async () => {
  try {
    const res = await api.get<MeetingScheme[]>("/meetings", getConfig());
    return handleResponse(res, 200);
  } catch (e) {
    handleServerError(e);
    return <MeetingScheme[]>{};
  }
};

const getById = async (id: number) => {
  try {
    const res = await api.get<MeetingCardScheme[]>(
      `/meetings/${id}`,
      getConfig()
    );
    return handleResponse(res, 200);
  } catch (e) {
    handleServerError(e);
    return <MeetingCardScheme>{};
  }
};

const getAllByUserID = async (id: number) => {
  try {
    const res = await api.get<MeetingCardScheme[]>(
      `/meetings/user/${id}`,
      getConfig()
    );
    return handleResponse(res, 200);
  } catch (e) {
    handleServerError(e);
    return <MeetingCardScheme[]>{};
  }
};

const create = async (
  data: MeetingCreateScheme
): Promise<MeetingCreateScheme> => {
  try {
    const res = await api.post<MeetingCreateScheme>(
      "/meetings",
      { ...data },
      getConfig()
    );
    return handleResponse(res, 201);
  } catch (e) {
    handleServerError(e);
    return {} as MeetingCreateScheme;
  }
};

const update = async (
  id: number,
  data: Partial<MeetingUpdateScheme>
): Promise<MeetingCardScheme> => {
  try {
    const res = await api.put<MeetingCardScheme>(
      `/meetings/${id}`,
      { ...data },
      getConfig()
    );
    return handleResponse(res, 201);
  } catch (e) {
    handleServerError(e);
    return {} as MeetingCardScheme;
  }
};

export const meetingsServices = {
  getAll,
  getById,
  getAllByUserID,
  create,
  update,
};
