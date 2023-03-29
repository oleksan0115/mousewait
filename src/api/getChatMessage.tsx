import axios, { AxiosResponse } from 'axios';
import { FetchUserMessageType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getFriendChatMessage = async ({
  userId,
}: FetchUserMessageType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/myConversation/' + userId;
  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
